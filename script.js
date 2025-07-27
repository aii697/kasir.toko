
// Data Storage
let currentUser = null;
let products = [
    { id: 1, name: 'Kantong Plastik HD', price: 5000, stock: 100 },
    { id: 2, name: 'Gelas Plastik', price: 3000, stock: 50 },
    { id: 3, name: 'Sedotan Plastik', price: 2000, stock: 200 },
    { id: 4, name: 'Wadah Makanan', price: 15000, stock: 30 }
];

let customers = [
    { id: 1, name: 'Umum', phone: '', address: '' },
    { id: 2, name: 'Ibu Sari', phone: '081234567890', address: 'Jl. Merdeka No. 1' },
    { id: 3, name: 'Bapak Joko', phone: '081234567891', address: 'Jl. Sudirman No. 2' }
];

let transactions = [];
let cart = [];

// Navigasi tab
function switchTab(tab) {
    document.getElementById("homeSection").classList.add("hidden");
    document.getElementById("dashboardSection").classList.add("hidden");
    document.getElementById("kasirSection").classList.add("hidden");
    document.getElementById(tab + "Section").classList.remove("hidden");

    if (tab === "dashboard") updateDashboard();
    if (tab === "kasir") renderProducts();
}

// Render produk di Kasir
function renderProducts(filtered = products) {
    const container = document.getElementById("productList");
    container.innerHTML = "";
    filtered.forEach(p => {
        const el = document.createElement("div");
        el.className = "bg-white p-4 rounded-xl shadow flex flex-col justify-between";
        el.innerHTML = `
            <h4 class="font-bold text-lg mb-1">${p.name}</h4>
            <p class="text-sky-600 font-semibold mb-2">Rp${p.price.toLocaleString()}</p>
            <button onclick="addToCart(${p.id})" class="bg-sky-600 text-white py-1 rounded hover:bg-sky-700">Tambah</button>
        `;
        container.appendChild(el);
    });
}

// Pencarian produk
function searchProducts() {
    const query = document.getElementById("searchInput").value.toLowerCase();
    const filtered = products.filter(p => p.name.toLowerCase().includes(query));
    renderProducts(filtered);
}

// Keranjang
function addToCart(id) {
    const product = products.find(p => p.id === id);
    const item = cart.find(c => c.id === id);
    if (item) {
        item.qty++;
    } else {
        cart.push({ ...product, qty: 1 });
    }
    updateCart();
    toggleCart(true);
}

function updateCart() {
    const container = document.getElementById("cartItems");
    const total = document.getElementById("cartTotal");
    container.innerHTML = "";
    let totalPrice = 0;
    cart.forEach(item => {
        totalPrice += item.price * item.qty;
        const row = document.createElement("div");
        row.className = "flex justify-between items-center mb-2";
        row.innerHTML = `
            <div>
                <p class="font-medium">${item.name}</p>
                <p class="text-sm text-slate-500">${item.qty} x Rp${item.price.toLocaleString()}</p>
            </div>
            <div class="flex gap-1">
                <button onclick="changeQty(${item.id}, -1)" class="px-2 rounded bg-slate-200">-</button>
                <button onclick="changeQty(${item.id}, 1)" class="px-2 rounded bg-slate-200">+</button>
            </div>
        `;
        container.appendChild(row);
    });
    total.textContent = "Rp" + totalPrice.toLocaleString();
}

function changeQty(id, delta) {
    const item = cart.find(c => c.id === id);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) {
        cart = cart.filter(c => c.id !== id);
    }
    updateCart();
}

function toggleCart(show) {
    const el = document.getElementById("cartSidebar");
    el.classList.toggle("hidden", !show);
}

// Checkout
function checkout() {
    if (cart.length === 0) return alert("Keranjang kosong!");
    const total = cart.reduce((sum, i) => sum + i.qty * i.price, 0);
    transactions.push({
        id: transactions.length + 1,
        customer: customers[0].name,
        total: total,
        date: new Date().toLocaleString()
    });
    cart = [];
    updateCart();
    toggleCart(false);
    alert("Transaksi berhasil!");
}

// Dashboard
function updateDashboard() {
    document.getElementById("totalProducts").textContent = products.length;
    document.getElementById("totalCustomers").textContent = customers.length;
    document.getElementById("totalTransactions").textContent = transactions.length;

    const table = document.getElementById("transactionTable");
    table.innerHTML = "";
    transactions.slice().reverse().forEach(t => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td class="py-2">${t.id}</td>
            <td class="py-2">${t.customer}</td>
            <td class="py-2">Rp${t.total.toLocaleString()}</td>
            <td class="py-2">${t.date}</td>
        `;
        table.appendChild(row);
    });
}

// Login Modal (masih bisa digunakan)
function showLoginModal() {
    document.getElementById('loginModal')?.classList.remove('hidden');
}
function closeLoginModal() {
    document.getElementById('loginModal')?.classList.add('hidden');
}
function login(username, password) {
    const users = {
        'admin': { password: 'admin123', role: 'Admin' },
        'kasir': { password: 'kasir123', role: 'Kasir' }
    };
    const user = users[username];
    if (user && user.password === password) {
        currentUser = { username, role: user.role };
        alert("Login berhasil sebagai " + user.role);
        closeLoginModal();
    } else {
        alert("Username atau password salah");
    }
}


// LocalStorage Helper
function saveData() {
    localStorage.setItem("transactions", JSON.stringify(transactions));
}

function loadData() {
    const saved = localStorage.getItem("transactions");
    if (saved) transactions = JSON.parse(saved);
}

window.addEventListener("DOMContentLoaded", () => {
    loadData();
    switchTab("home");
});

// Cetak struk setelah checkout
function checkout() {
    if (cart.length === 0) return alert("Keranjang kosong!");
    const total = cart.reduce((sum, i) => sum + i.qty * i.price, 0);
    const newTransaction = {
        id: transactions.length + 1,
        customer: customers[0].name,
        total: total,
        date: new Date().toLocaleString(),
        items: [...cart]
    };
    transactions.push(newTransaction);
    saveData();
    printReceipt(newTransaction);
    cart = [];
    updateCart();
    toggleCart(false);
    updateDashboard();
}

// Fungsi cetak struk
function printReceipt(transaction) {
    let content = `<h3>Struk Transaksi</h3>`;
    content += `<p><strong>ID:</strong> ${transaction.id}</p>`;
    content += `<p><strong>Tanggal:</strong> ${transaction.date}</p>`;
    content += `<p><strong>Pelanggan:</strong> ${transaction.customer}</p>`;
    content += `<hr><ul>`;
    transaction.items.forEach(item => {
        content += `<li>${item.qty} x ${item.name} @ Rp${item.price.toLocaleString()} = Rp${(item.qty * item.price).toLocaleString()}</li>`;
    });
    content += `</ul><hr>`;
    content += `<p><strong>Total:</strong> Rp${transaction.total.toLocaleString()}</p>`;

    const win = window.open("", "_blank", "width=400,height=600");
    win.document.write(`<html><head><title>Struk</title></head><body style="font-family: sans-serif; padding: 20px;">${content}</body></html>`);
    win.document.close();
    win.print();
}

// Role-based Login UI
function login(username, password) {
    const users = {
        'admin': { password: 'admin123', role: 'Admin' },
        'kasir': { password: 'kasir123', role: 'Kasir' }
    };
    const user = users[username];
    if (user && user.password === password) {
        currentUser = { username, role: user.role };
        alert("Login berhasil sebagai " + user.role);
        closeLoginModal();
        applyRoleAccess();
    } else {
        alert("Username atau password salah");
    }
}

function applyRoleAccess() {
    // Sembunyikan semua dulu
    document.querySelectorAll("nav button").forEach(btn => btn.classList.add("hidden"));

    if (!currentUser) return;
    if (currentUser.role === "Admin") {
        document.querySelector("button[onclick="switchTab('dashboard')"]").classList.remove("hidden");
        switchTab("dashboard");
    } else if (currentUser.role === "Kasir") {
        document.querySelector("button[onclick="switchTab('kasir')"]").classList.remove("hidden");
        switchTab("kasir");
    }
}
