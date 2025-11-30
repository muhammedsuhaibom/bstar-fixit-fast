import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { 
  LogOut, 
  RefreshCw, 
  Trash2, 
  Eye, 
  Phone, 
  Smartphone,
  Calendar,
  MessageSquare,
  Shield
} from "lucide-react";

interface Booking {
  id: string;
  name: string;
  phone: string;
  device: string;
  issue: string;
  message: string | null;
  status: string;
  created_at: string;
  updated_at: string;
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
        if (session?.user) {
          setTimeout(() => {
            checkAdminRole(session.user.id);
          }, 0);
        } else {
          setLoading(false);
          navigate("/auth");
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        checkAdminRole(session.user.id);
      } else {
        setLoading(false);
        navigate("/auth");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const checkAdminRole = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", userId)
        .eq("role", "admin")
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setIsAdmin(true);
        fetchBookings();
      } else {
        setIsAdmin(false);
        toast({
          title: "Access Denied",
          description: "You don't have admin privileges.",
          variant: "destructive",
        });
        navigate("/");
      }
    } catch (error) {
      console.error("Error checking admin role:", error);
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  const fetchBookings = async () => {
    setRefreshing(true);
    try {
      const { data, error } = await supabase
        .from("bookings")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setBookings(data || []);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      toast({
        title: "Error",
        description: "Failed to fetch bookings.",
        variant: "destructive",
      });
    } finally {
      setRefreshing(false);
    }
  };

  const updateBookingStatus = async (bookingId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from("bookings")
        .update({ status: newStatus })
        .eq("id", bookingId);

      if (error) throw error;

      setBookings(bookings.map(b => 
        b.id === bookingId ? { ...b, status: newStatus } : b
      ));

      toast({
        title: "Status Updated",
        description: `Booking status changed to ${newStatus}.`,
      });
    } catch (error) {
      console.error("Error updating status:", error);
      toast({
        title: "Error",
        description: "Failed to update booking status.",
        variant: "destructive",
      });
    }
  };

  const deleteBooking = async (bookingId: string) => {
    if (!confirm("Are you sure you want to delete this booking?")) return;

    try {
      const { error } = await supabase
        .from("bookings")
        .delete()
        .eq("id", bookingId);

      if (error) throw error;

      setBookings(bookings.filter(b => b.id !== bookingId));
      setSelectedBooking(null);

      toast({
        title: "Booking Deleted",
        description: "The booking has been removed.",
      });
    } catch (error) {
      console.error("Error deleting booking:", error);
      toast({
        title: "Error",
        description: "Failed to delete booking.",
        variant: "destructive",
      });
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "confirmed": return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "in_progress": return "bg-purple-500/20 text-purple-400 border-purple-500/30";
      case "completed": return "bg-green-500/20 text-green-400 border-green-500/30";
      case "cancelled": return "bg-red-500/20 text-red-400 border-red-500/30";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  const stats = {
    total: bookings.length,
    pending: bookings.filter(b => b.status === "pending").length,
    inProgress: bookings.filter(b => b.status === "in_progress").length,
    completed: bookings.filter(b => b.status === "completed").length,
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-xl font-bold text-foreground">Admin Dashboard</h1>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={fetchBookings}
              disabled={refreshing}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? "animate-spin" : ""}`} />
              Refresh
            </Button>
            <Button variant="destructive" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Bookings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{stats.total}</div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-yellow-400">Pending</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-400">{stats.pending}</div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-purple-400">In Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-400">{stats.inProgress}</div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-green-400">Completed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-400">{stats.completed}</div>
            </CardContent>
          </Card>
        </div>

        {/* Bookings Table */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Booking Requests</CardTitle>
          </CardHeader>
          <CardContent>
            {bookings.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <Smartphone className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No booking requests yet.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-border">
                      <TableHead className="text-muted-foreground">Customer</TableHead>
                      <TableHead className="text-muted-foreground">Device</TableHead>
                      <TableHead className="text-muted-foreground">Issue</TableHead>
                      <TableHead className="text-muted-foreground">Status</TableHead>
                      <TableHead className="text-muted-foreground">Date</TableHead>
                      <TableHead className="text-muted-foreground">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bookings.map((booking) => (
                      <TableRow key={booking.id} className="border-border hover:bg-muted/50">
                        <TableCell>
                          <div>
                            <p className="font-medium text-foreground">{booking.name}</p>
                            <p className="text-sm text-muted-foreground flex items-center gap-1">
                              <Phone className="h-3 w-3" />
                              {booking.phone}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell className="text-foreground">{booking.device}</TableCell>
                        <TableCell className="text-foreground max-w-[200px] truncate">{booking.issue}</TableCell>
                        <TableCell>
                          <Select
                            value={booking.status}
                            onValueChange={(value) => updateBookingStatus(booking.id, value)}
                          >
                            <SelectTrigger className={`w-[130px] ${getStatusColor(booking.status)} border`}>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pending">Pending</SelectItem>
                              <SelectItem value="confirmed">Confirmed</SelectItem>
                              <SelectItem value="in_progress">In Progress</SelectItem>
                              <SelectItem value="completed">Completed</SelectItem>
                              <SelectItem value="cancelled">Cancelled</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell className="text-muted-foreground text-sm">
                          {formatDate(booking.created_at)}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => setSelectedBooking(booking)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-destructive hover:text-destructive"
                              onClick={() => deleteBooking(booking.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </main>

      {/* Booking Detail Dialog */}
      <Dialog open={!!selectedBooking} onOpenChange={() => setSelectedBooking(null)}>
        <DialogContent className="bg-card border-border max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-foreground">Booking Details</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Full information about this booking request.
            </DialogDescription>
          </DialogHeader>
          {selectedBooking && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Customer Name</p>
                  <p className="font-medium text-foreground">{selectedBooking.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium text-foreground flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    {selectedBooking.phone}
                  </p>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Device</p>
                <p className="font-medium text-foreground flex items-center gap-2">
                  <Smartphone className="h-4 w-4" />
                  {selectedBooking.device}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Issue</p>
                <p className="font-medium text-foreground">{selectedBooking.issue}</p>
              </div>
              {selectedBooking.message && (
                <div>
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    Additional Message
                  </p>
                  <p className="text-foreground bg-muted/50 p-3 rounded-lg mt-1">
                    {selectedBooking.message}
                  </p>
                </div>
              )}
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div>
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Submitted
                  </p>
                  <p className="text-sm text-foreground">{formatDate(selectedBooking.created_at)}</p>
                </div>
                <Badge className={getStatusColor(selectedBooking.status)}>
                  {selectedBooking.status}
                </Badge>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;
