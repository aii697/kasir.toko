import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  ShoppingCart, 
  Plus, 
  Minus, 
  Trash2, 
  Calculator, 
  CreditCard, 
  User, 
  Receipt,
  CheckCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  unit: string;
}

interface CartItem extends Product {
  quantity: number;
}

interface Customer {
  id: string;
  name: string;
  phone: string;
  address: string;
}

const TransactionForm = () => {
  const [products] = useState<Product[]>([
    { id: "1", name: "Kantong Plastik HD 28x37", price: 25000, stock: 100, unit: "pack" },
    { id: "2", name: "Gelas Plastik 220ml", price: 15000, stock: 50, unit: "pack" },
    { id: "3", name: "Sedotan Plastik", price: 8000, stock: 200, unit: "pack" },
    { id: "4", name: "Tupperware 500ml", price: 12000, stock: 30, unit: "pcs" },
  ]);

  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [paymentType, setPaymentType] = useState<"cash" | "credit">("cash");
  const [paymentAmount, setPaymentAmount] = useState("");
  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    address: ""
  });
  const [showReceipt, setShowReceipt] = useState(false);
  const [receiptData, setReceiptData] = useState<any>(null);
  const { toast } = useToast();

  const addToCart = () => {
    if (!selectedProduct) {
      toast({
        title: "Error",
        description: "Pilih produk terlebih dahulu",
        variant: "destructive"
      });
      return;
    }

    const product = products.find(p => p.id === selectedProduct);
    if (!product) return;

    if (quantity > product.stock) {
      toast({
        title: "Error",
        description: "Jumlah melebihi stok tersedia",
        variant: "destructive"
      });
      return;
    }

    const existingItem = cart.find(item => item.id === selectedProduct);
    if (existingItem) {
      if (existingItem.quantity + quantity > product.stock) {
        toast({
          title: "Error",
          description: "Total jumlah melebihi stok tersedia",
          variant: "destructive"
        });
        return;
      }
      setCart(cart.map(item => 
        item.id === selectedProduct 
          ? { ...item, quantity: item.quantity + quantity }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity }]);
    }

    setSelectedProduct("");
    setQuantity(1);
    toast({
      title: "Berhasil",
      description: "Produk ditambahkan ke keranjang"
    });
  };

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(id);
      return;
    }

    const product = products.find(p => p.id === id);
    if (product && newQuantity > product.stock) {
      toast({
        title: "Error",
        description: "Jumlah melebihi stok tersedia",
        variant: "destructive"
      });
      return;
    }

    setCart(cart.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const removeFromCart = (id: string) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const processTransaction = () => {
    if (cart.length === 0) {
      toast({
        title: "Error",
        description: "Keranjang kosong",
        variant: "destructive"
      });
      return;
    }

    const total = calculateTotal();

    if (paymentType === "cash") {
      const payment = parseFloat(paymentAmount);
      if (!payment || payment < total) {
        toast({
          title: "Error",
          description: "Jumlah pembayaran tidak mencukupi",
          variant: "destructive"
        });
        return;
      }
    } else {
      if (!customer.name || !customer.phone) {
        toast({
          title: "Error",
          description: "Data pelanggan harus diisi untuk kasbon",
          variant: "destructive"
        });
        return;
      }
    }

    // Proses transaksi
    const transactionData = {
      id: Date.now().toString(),
      items: cart,
      total,
      paymentType,
      paymentAmount: paymentType === "cash" ? parseFloat(paymentAmount) : 0,
      change: paymentType === "cash" ? parseFloat(paymentAmount) - total : 0,
      customer: paymentType === "credit" ? customer : null,
      timestamp: new Date().toLocaleString("id-ID")
    };

    setReceiptData(transactionData);
    setShowReceipt(true);

    // Reset form
    setCart([]);
    setPaymentAmount("");
    setCustomer({ name: "", phone: "", address: "" });
    setPaymentType("cash");

    toast({
      title: "Transaksi Berhasil",
      description: "Transaksi telah diproses",
      variant: "default"
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR"
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <ShoppingCart className="h-5 w-5" />
            <span>Sistem Kasir</span>
          </CardTitle>
          <CardDescription>
            Proses transaksi penjualan produk plastik
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Add Product Section */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-muted rounded-lg">
            <div className="space-y-2">
              <Label>Pilih Produk</Label>
              <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih produk" />
                </SelectTrigger>
                <SelectContent>
                  {products.map((product) => (
                    <SelectItem key={product.id} value={product.id}>
                      <div className="flex flex-col">
                        <span>{product.name}</span>
                        <span className="text-sm text-muted-foreground">
                          {formatCurrency(product.price)} - Stok: {product.stock} {product.unit}
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Jumlah</Label>
              <Input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
              />
            </div>
            <div className="flex items-end">
              <Button onClick={addToCart} className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Tambah
              </Button>
            </div>
          </div>

          {/* Cart Section */}
          {cart.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Keranjang Belanja</h3>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Produk</TableHead>
                      <TableHead>Harga</TableHead>
                      <TableHead>Jumlah</TableHead>
                      <TableHead>Subtotal</TableHead>
                      <TableHead className="text-right">Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {cart.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.name}</TableCell>
                        <TableCell>{formatCurrency(item.price)}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell>{formatCurrency(item.price * item.quantity)}</TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => removeFromCart(item.id)}
                            className="hover:bg-destructive hover:text-destructive-foreground"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              
              <div className="flex justify-end">
                <div className="text-right space-y-2">
                  <div className="text-2xl font-bold">
                    Total: {formatCurrency(calculateTotal())}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Payment Section */}
          {cart.length > 0 && (
            <div className="space-y-4 p-4 border rounded-lg">
              <h3 className="text-lg font-semibold flex items-center space-x-2">
                <Calculator className="h-5 w-5" />
                <span>Pembayaran</span>
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Tipe Pembayaran</Label>
                  <Select value={paymentType} onValueChange={(value: "cash" | "credit") => setPaymentType(value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cash">
                        <div className="flex items-center space-x-2">
                          <CreditCard className="h-4 w-4" />
                          <span>Tunai</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="credit">
                        <div className="flex items-center space-x-2">
                          <User className="h-4 w-4" />
                          <span>Kasbon</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {paymentType === "cash" && (
                  <div className="space-y-2">
                    <Label>Jumlah Bayar</Label>
                    <Input
                      type="number"
                      placeholder="0"
                      value={paymentAmount}
                      onChange={(e) => setPaymentAmount(e.target.value)}
                    />
                    {paymentAmount && parseFloat(paymentAmount) >= calculateTotal() && (
                      <p className="text-sm text-success">
                        Kembalian: {formatCurrency(parseFloat(paymentAmount) - calculateTotal())}
                      </p>
                    )}
                  </div>
                )}
              </div>

              {paymentType === "credit" && (
                <div className="space-y-4 p-4 bg-muted rounded-lg">
                  <h4 className="font-medium">Data Pelanggan Kasbon</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Nama Pelanggan</Label>
                      <Input
                        placeholder="Nama lengkap"
                        value={customer.name}
                        onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>No. Telepon</Label>
                      <Input
                        placeholder="08xxxxxxxxxx"
                        value={customer.phone}
                        onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Alamat</Label>
                    <Input
                      placeholder="Alamat lengkap"
                      value={customer.address}
                      onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                    />
                  </div>
                </div>
              )}

              <Button onClick={processTransaction} className="w-full" size="lg">
                <CheckCircle className="h-5 w-5 mr-2" />
                Proses Transaksi
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Receipt Dialog */}
      <Dialog open={showReceipt} onOpenChange={setShowReceipt}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Receipt className="h-5 w-5" />
              <span>Struk Transaksi</span>
            </DialogTitle>
            <DialogDescription>
              Transaksi berhasil diproses
            </DialogDescription>
          </DialogHeader>
          
          {receiptData && (
            <div className="space-y-4 text-sm">
              <div className="text-center border-b pb-4">
                <h3 className="font-bold text-lg">TUNAS MUSTIKA</h3>
                <p>Toko Plastik</p>
                <p>Jl. Gajah Mada No III C G.Pangilun</p>
                <p>Telp: 301469684</p>
              </div>
              
              <div className="space-y-1">
                <p>No: {receiptData.id}</p>
                <p>Tanggal: {receiptData.timestamp}</p>
                <p>Kasir: {receiptData.paymentType === "cash" ? "Tunai" : "Kasbon"}</p>
              </div>

              <Separator />

              <div className="space-y-1">
                {receiptData.items.map((item: CartItem) => (
                  <div key={item.id} className="flex justify-between">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-muted-foreground">
                        {item.quantity} x {formatCurrency(item.price)}
                      </p>
                    </div>
                    <p>{formatCurrency(item.price * item.quantity)}</p>
                  </div>
                ))}
              </div>

              <Separator />

              <div className="space-y-1">
                <div className="flex justify-between font-bold text-base">
                  <span>TOTAL:</span>
                  <span>{formatCurrency(receiptData.total)}</span>
                </div>
                
                {receiptData.paymentType === "cash" && (
                  <>
                    <div className="flex justify-between">
                      <span>Bayar:</span>
                      <span>{formatCurrency(receiptData.paymentAmount)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Kembalian:</span>
                      <span>{formatCurrency(receiptData.change)}</span>
                    </div>
                  </>
                )}

                {receiptData.customer && (
                  <div className="pt-2 border-t">
                    <p className="font-medium">Data Kasbon:</p>
                    <p>Nama: {receiptData.customer.name}</p>
                    <p>Telp: {receiptData.customer.phone}</p>
                    {receiptData.customer.address && (
                      <p>Alamat: {receiptData.customer.address}</p>
                    )}
                  </div>
                )}
              </div>

              <div className="text-center text-muted-foreground pt-4 border-t">
                <p>Terima kasih atas kunjungan Anda!</p>
              </div>
            </div>
          )}
          
          <Button onClick={() => setShowReceipt(false)} className="w-full">
            Tutup
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TransactionForm;