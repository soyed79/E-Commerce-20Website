import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User, Package, MapPin, LogOut } from "lucide-react";
import Layout from "@/components/Layout";
import { getCurrentUser, setCurrentUser, getUserOrders } from "@/lib/storage";

export default function Dashboard() {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      setOrders(getUserOrders(user.id));
    }
  }, [user, navigate]);

  if (!user) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 text-center">
          <p>Loading...</p>
        </div>
      </Layout>
    );
  }

  const handleLogout = () => {
    setCurrentUser(null);
    navigate("/");
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">My Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {/* User Card */}
          <div className="md:col-span-4 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary-foreground/20 rounded-full flex items-center justify-center">
                  <User size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{user.name}</h2>
                  <p className="opacity-90">{user.email}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-primary-foreground/20 hover:bg-primary-foreground/30 px-4 py-2 rounded-lg transition-colors"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">
                {orders.length}
              </div>
              <p className="text-muted-foreground">Total Orders</p>
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-accent mb-2">
                {orders.filter((o) => o.status === "delivered").length}
              </div>
              <p className="text-muted-foreground">Delivered</p>
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-500 mb-2">
                ৳ {orders.reduce((sum, o) => sum + o.total, 0)}
              </div>
              <p className="text-muted-foreground">Total Spent</p>
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-500 mb-2">
                {orders.filter((o) => o.status === "pending").length}
              </div>
              <p className="text-muted-foreground">Pending</p>
            </div>
          </div>
        </div>

        {/* User Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <User size={20} />
              Profile Information
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Name</span>
                <span className="font-semibold">{user.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Email</span>
                <span className="font-semibold">{user.email}</span>
              </div>
              {user.phone && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Phone</span>
                  <span className="font-semibold">{user.phone}</span>
                </div>
              )}
              {user.address && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Address</span>
                  <span className="font-semibold">{user.address}</span>
                </div>
              )}
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <MapPin size={20} />
              Quick Actions
            </h3>
            <div className="space-y-2">
              <button className="w-full text-left px-4 py-2 hover:bg-secondary rounded-lg transition-colors">
                Edit Profile
              </button>
              <button className="w-full text-left px-4 py-2 hover:bg-secondary rounded-lg transition-colors">
                Change Password
              </button>
              <button className="w-full text-left px-4 py-2 hover:bg-secondary rounded-lg transition-colors">
                Manage Addresses
              </button>
              <button className="w-full text-left px-4 py-2 hover:bg-secondary rounded-lg transition-colors">
                Payment Methods
              </button>
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Package size={20} />
            Recent Orders
          </h3>

          {orders.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-semibold">Order ID</th>
                    <th className="text-left py-3 px-4 font-semibold">Date</th>
                    <th className="text-left py-3 px-4 font-semibold">Items</th>
                    <th className="text-left py-3 px-4 font-semibold">Total</th>
                    <th className="text-left py-3 px-4 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} className="border-b border-border hover:bg-secondary transition-colors">
                      <td className="py-3 px-4">{order.id.substring(0, 15)}...</td>
                      <td className="py-3 px-4">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4">{order.items.length}</td>
                      <td className="py-3 px-4 font-semibold">৳ {order.total}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            order.status === "delivered"
                              ? "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                              : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400"
                          }`}
                        >
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-8">No orders yet</p>
          )}
        </div>
      </div>
    </Layout>
  );
}
