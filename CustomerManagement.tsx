import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Users, Phone, MapPin, CreditCard } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Customer {
  id: string;
  name: string;
  phone: string;
  address: string;
  totalDebt: number;
  lastTransaction: string;
  status: "active" | "inactive";
}

const CustomerManagement = () => {
  const [customers, setCustomers] = useState<Customer[]>([
    { 
      id: "1", 
      name: "Ibu Sari", 
      phone: "081234567890", 
      address: "Jl. Merdeka No. 12", 
      totalDebt: 150000, 
      lastTransaction: "2024-01-15",
      status: "active"
    },
    { 
      id: "2", 
      name: "Bapak Joko", 
      phone: "082345678901", 
      address: "Jl. Sudirman No. 45", 
      totalDebt: 75000, 
      lastTransaction: "2024-01-14",
      status: "active"
    },
    { 
      id: "3", 
      name: "Ibu Rina", 
      phone: "083456789012", 
      address: "Jl. Ahmad Yani No. 23", 
      totalDebt: 0, 
      lastTransaction: "2024-01-10",
      status: "inactive"
    },
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: ""
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone || !formData.address) {
      toast({
        title: "Error",
        description: "Semua field harus diisi",
        variant: "destructive"
      });
      return;
    }

    const customerData = {
      id: editingCustomer?.id || Date.now().toString(),
      name: formData.name,
      phone: formData.phone,
      address: formData.address,
      totalDebt: editingCustomer?.totalDebt || 0,
      lastTransaction: editingCustomer?.lastTransaction || new Date().toISOString().split('T')[0],
      status: editingCustomer?.status || "inactive" as const
    };

    if (editingCustomer) {
      setCustomers(customers.map(c => c.id === editingCustomer.id ? customerData : c));
      toast({
        title: "Berhasil",
        description: "Data pelanggan berhasil diperbarui"
      });
    } else {
      setCustomers([...customers, customerData]);
      toast({
        title: "Berhasil",
        description: "Pelanggan baru berhasil ditambahkan"
      });
    }

    setFormData({ name: "", phone: "", address: "" });
    setEditingCustomer(null);
    setIsDialogOpen(false);
  };

  const handleEdit = (customer: Customer) => {
    setEditingCustomer(customer);
    setFormData({
      name: customer.name,
      phone: customer.phone,
      address: customer.address
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    const customer = customers.find(c => c.id === id);
    if (customer && customer.totalDebt > 0) {
      toast({
        title: "Error",
        description: "Tidak dapat menghapus pelanggan yang masih memiliki hutang",
        variant: "destructive"
      });
      return;
    }

    setCustomers(customers.filter(c => c.id !== id));
    toast({
      title: "Berhasil",
      description: "Pelanggan berhasil dihapus"
    });
  };

  const handlePayDebt = (id: string, amount: number) => {
    setCustomers(customers.map(c => 
      c.id === id 
        ? { 
            ...c, 
            totalDebt: Math.max(0, c.totalDebt - amount),
            status: (c.totalDebt - amount) <= 0 ? "inactive" : "active"
          } 
        : c
    ));
    toast({
      title: "Berhasil",
      description: "Pembayaran hutang berhasil dicatat"
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR"
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID");
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>Manajemen Pelanggan</span>
            </CardTitle>
            <CardDescription>
              Kelola data pelanggan dan kasbon
            </CardDescription>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => {
                setEditingCustomer(null);
                setFormData({ name: "", phone: "", address: "" });
              }}>
                <Plus className="h-4 w-4 mr-2" />
                Tambah Pelanggan
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {editingCustomer ? "Edit Pelanggan" : "Tambah Pelanggan Baru"}
                </DialogTitle>
                <DialogDescription>
                  {editingCustomer ? "Perbarui informasi pelanggan" : "Masukkan informasi pelanggan baru"}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nama Lengkap</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Masukkan nama lengkap"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">No. Telepon</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="08xxxxxxxxxx"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Alamat</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="Masukkan alamat lengkap"
                  />
                </div>
                <div className="flex space-x-2 pt-4">
                  <Button type="submit" className="flex-1">
                    {editingCustomer ? "Perbarui" : "Tambah"} Pelanggan
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Batal
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Users className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-2xl font-bold">{customers.length}</p>
                  <p className="text-sm text-muted-foreground">Total Pelanggan</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <CreditCard className="h-8 w-8 text-warning" />
                <div>
                  <p className="text-2xl font-bold">
                    {customers.filter(c => c.totalDebt > 0).length}
                  </p>
                  <p className="text-sm text-muted-foreground">Pelanggan Kasbon</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-full bg-destructive flex items-center justify-center">
                  <span className="text-destructive-foreground font-bold">Rp</span>
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {formatCurrency(customers.reduce((total, c) => total + c.totalDebt, 0))}
                  </p>
                  <p className="text-sm text-muted-foreground">Total Hutang</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Customer Table */}
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama</TableHead>
                <TableHead>Kontak</TableHead>
                <TableHead>Alamat</TableHead>
                <TableHead>Hutang</TableHead>
                <TableHead>Transaksi Terakhir</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>
                    <div className="font-medium">{customer.name}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1 text-sm">
                      <Phone className="h-3 w-3" />
                      <span>{customer.phone}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1 text-sm">
                      <MapPin className="h-3 w-3" />
                      <span className="truncate max-w-xs">{customer.address}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">
                      {formatCurrency(customer.totalDebt)}
                    </div>
                    {customer.totalDebt > 0 && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-1"
                        onClick={() => {
                          const amount = prompt("Masukkan jumlah pembayaran:");
                          if (amount && !isNaN(Number(amount))) {
                            handlePayDebt(customer.id, Number(amount));
                          }
                        }}
                      >
                        Bayar
                      </Button>
                    )}
                  </TableCell>
                  <TableCell>{formatDate(customer.lastTransaction)}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={customer.status === "active" ? "default" : "secondary"}
                    >
                      {customer.status === "active" ? "Aktif" : "Tidak Aktif"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex space-x-2 justify-end">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(customer)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(customer.id)}
                        className="hover:bg-destructive hover:text-destructive-foreground"
                        disabled={customer.totalDebt > 0}
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
      </CardContent>
    </Card>
  );
};

export default CustomerManagement;