import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ShoppingCart, 
  Package, 
  Users, 
  CreditCard, 
  TrendingUp, 
  DollarSign,
  Receipt
} from "lucide-react";
import ProductManagement from "./ProductManagement";
import TransactionForm from "../transaction/TransactionForm";
import CustomerManagement from "./CustomerManagement";

interface DashboardProps {
  user: { name: string; role: string };
}

const Dashboard = ({ user }: DashboardProps) => {
  const [activeTab, setActiveTab] = useState("pos");

  const stats = [
    {
      title: "Transaksi Hari Ini",
      value: "24",
      icon: ShoppingCart,
      change: "+12%",
      color: "text-primary"
    },
    {
      title: "Total Produk",
      value: "156",
      icon: Package,
      change: "+3",
      color: "text-secondary"
    },
    {
      title: "Pelanggan Kasbon",
      value: "8",
      icon: Users,
      change: "+2",
      color: "text-warning"
    },
    {
      title: "Pendapatan Hari Ini",
      value: "Rp 2,450,000",
      icon: DollarSign,
      change: "+18%",
      color: "text-success"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-primary to-secondary rounded-lg p-6 text-white">
          <h2 className="text-2xl font-bold mb-2">
            Selamat Datang, {user.name}!
          </h2>
          <p className="opacity-90">
            {user.role === "admin" 
              ? "Kelola toko Anda dengan mudah melalui dashboard admin" 
              : "Proses transaksi pelanggan dengan cepat dan akurat"
            }
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-medium transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-sm text-success">
                      {stat.change} dari kemarin
                    </p>
                  </div>
                  <div className={`p-3 rounded-full bg-muted ${stat.color}`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
            <TabsTrigger value="pos" className="flex items-center space-x-2">
              <ShoppingCart className="h-4 w-4" />
              <span>Kasir</span>
            </TabsTrigger>
            {user.role === "admin" && (
              <>
                <TabsTrigger value="products" className="flex items-center space-x-2">
                  <Package className="h-4 w-4" />
                  <span>Produk</span>
                </TabsTrigger>
                <TabsTrigger value="customers" className="flex items-center space-x-2">
                  <Users className="h-4 w-4" />
                  <span>Pelanggan</span>
                </TabsTrigger>
                <TabsTrigger value="reports" className="flex items-center space-x-2">
                  <TrendingUp className="h-4 w-4" />
                  <span>Laporan</span>
                </TabsTrigger>
              </>
            )}
          </TabsList>

          <TabsContent value="pos" className="space-y-6">
            <TransactionForm />
          </TabsContent>

          {user.role === "admin" && (
            <>
              <TabsContent value="products" className="space-y-6">
                <ProductManagement />
              </TabsContent>

              <TabsContent value="customers" className="space-y-6">
                <CustomerManagement />
              </TabsContent>

              <TabsContent value="reports" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <TrendingUp className="h-5 w-5" />
                      <span>Laporan Penjualan</span>
                    </CardTitle>
                    <CardDescription>
                      Analisis penjualan dan performa toko
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-12 text-muted-foreground">
                      <Receipt className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>Fitur laporan akan segera tersedia</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </>
          )}
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;