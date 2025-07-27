import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ShoppingBag, 
  MapPin, 
  Phone, 
  Clock, 
  Shield, 
  Truck, 
  Award,
  CheckCircle,
  Star
} from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
  const features = [
    {
      icon: Shield,
      title: "Kualitas Terjamin",
      description: "Produk plastik berkualitas tinggi dengan standar internasional"
    },
    {
      icon: Truck,
      title: "Pengiriman Cepat",
      description: "Layanan pengiriman yang cepat dan aman ke seluruh wilayah"
    },
    {
      icon: Award,
      title: "Harga Terbaik",
      description: "Harga kompetitif dengan kualitas premium untuk semua produk"
    },
    {
      icon: CheckCircle,
      title: "Pelayanan Prima",
      description: "Tim customer service yang responsif dan profesional"
    }
  ];

  const products = [
    {
      name: "Kantong Plastik HD",
      description: "Kantong plastik berkualitas tinggi berbagai ukuran",
      image: "🛍️"
    },
    {
      name: "Gelas Plastik",
      description: "Gelas plastik untuk berbagai kebutuhan",
      image: "🥤"
    },
    {
      name: "Sedotan Plastik",
      description: "Sedotan plastik ramah lingkungan",
      image: "🥤"
    },
    {
      name: "Wadah Makanan",
      description: "Tupperware dan wadah penyimpanan",
      image: "🍱"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border shadow-soft">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-primary p-2 rounded-lg">
                <ShoppingBag className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Tunas Mustika</h1>
                <p className="text-sm text-muted-foreground">Toko Plastik Terpercaya</p>
              </div>
            </div>
            
            <Link to="/admin">
              <Button variant="outline">
                <Shield className="h-4 w-4 mr-2" />
                Login Sistem
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
              Solusi Lengkap
              <span className="text-primary"> Produk Plastik</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Tunas Mustika menyediakan berbagai produk plastik berkualitas tinggi 
              untuk kebutuhan rumah tangga, bisnis, dan industri dengan harga terbaik.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/admin">
                <Button size="lg" className="w-full sm:w-auto">
                  <ShoppingBag className="h-5 w-5 mr-2" />
                  Mulai Berbelanja
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                <Phone className="h-5 w-5 mr-2" />
                Hubungi Kami
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Mengapa Pilih Tunas Mustika?</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Kami berkomitmen memberikan produk dan layanan terbaik untuk kepuasan pelanggan
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-medium transition-shadow">
                <CardContent className="p-6">
                  <div className="bg-primary/10 p-3 rounded-full w-fit mx-auto mb-4">
                    <feature.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h4 className="text-lg font-semibold mb-2">{feature.title}</h4>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Produk Unggulan</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Berbagai pilihan produk plastik berkualitas untuk semua kebutuhan Anda
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <Card key={index} className="hover:shadow-medium transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-4">{product.image}</div>
                  <h4 className="text-lg font-semibold mb-2">{product.name}</h4>
                  <p className="text-muted-foreground text-sm mb-4">{product.description}</p>
                  <Button variant="outline" size="sm">
                    Lihat Detail
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Kunjungi Toko Kami</h3>
            <p className="text-muted-foreground">
              Datang langsung ke toko atau hubungi kami untuk informasi lebih lanjut
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="bg-primary/10 p-3 rounded-full w-fit mx-auto mb-4">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <h4 className="font-semibold mb-2">Alamat</h4>
                <p className="text-muted-foreground text-sm">
                  Jl. Gajah Mada No III C<br />
                  G.Pangilun
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="bg-primary/10 p-3 rounded-full w-fit mx-auto mb-4">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <h4 className="font-semibold mb-2">Telepon</h4>
                <p className="text-muted-foreground text-sm">
                  301469684
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="bg-primary/10 p-3 rounded-full w-fit mx-auto mb-4">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <h4 className="font-semibold mb-2">Jam Buka</h4>
                <p className="text-muted-foreground text-sm">
                  Senin - Sabtu<br />
                  08:00 - 17:00 WIB
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Testimoni Pelanggan</h3>
            <p className="text-muted-foreground">
              Apa kata pelanggan setia tentang produk dan layanan kami
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              {
                name: "Ibu Sari",
                text: "Produk berkualitas dan harga sangat terjangkau. Sudah langganan bertahun-tahun!",
                rating: 5
              },
              {
                name: "Bapak Joko",
                text: "Pelayanan ramah dan pengiriman selalu tepat waktu. Recommended!",
                rating: 5
              },
              {
                name: "Ibu Rina",
                text: "Variasi produk lengkap dan kualitas plastik sangat baik. Terima kasih!",
                rating: 5
              }
            ].map((testimonial, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-warning text-warning" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 italic">
                    "{testimonial.text}"
                  </p>
                  <p className="font-semibold text-sm">- {testimonial.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-4 mb-4">
            <div className="bg-primary p-2 rounded-lg">
              <ShoppingBag className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h4 className="text-xl font-bold">Tunas Mustika</h4>
              <p className="text-sm text-muted-foreground">Toko Plastik Terpercaya</p>
            </div>
          </div>
          <p className="text-muted-foreground text-sm">
            © 2024 Tunas Mustika. Semua hak cipta dilindungi.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;