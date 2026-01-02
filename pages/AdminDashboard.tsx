
import React, { useState, useEffect } from 'react';
import { storageService } from '../services/storageService';
import { Order, Product, User } from '../types';
import { 
  Package, 
  ShoppingCart, 
  CheckCircle, 
  XCircle, 
  Plus, 
  LogOut, 
  X, 
  Trash2, 
  Edit3, 
  Settings, 
  Menu,
  Users as UsersIcon,
  TrendingUp,
  Clock
} from 'lucide-react';

interface Props {
  onProductsUpdated?: () => void;
}

const AdminDashboard: React.FC<Props> = ({ onProductsUpdated }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [view, setView] = useState<'orders' | 'products' | 'users'>('orders');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    nameAm: '',
    price: 0,
    category: 'Women',
    description: '',
    descriptionAm: '',
    image: '',
    sizes: ['Free Size'],
    colors: ['White']
  });

  useEffect(() => {
    refreshData();
  }, []);

  const refreshData = () => {
    setOrders(storageService.getOrders());
    setProducts(storageService.getProducts());
    setUsers(storageService.getUsers());
  };

  const handleStatusChange = (orderId: string, status: Order['status']) => {
    storageService.updateOrderStatus(orderId, status);
    refreshData();
  };

  const openAddModal = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      nameAm: '',
      price: 0,
      category: 'Women',
      description: '',
      descriptionAm: '',
      image: '',
      sizes: ['Free Size'],
      colors: ['White']
    });
    setIsModalOpen(true);
  };

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setFormData(product);
    setIsModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const currentProducts = storageService.getProducts();
    if (editingProduct) {
      const updated = currentProducts.map(p => p.id === editingProduct.id ? { ...p, ...formData } as Product : p);
      storageService.saveProducts(updated);
    } else {
      const newProd: Product = { ...formData as Product, id: `prod-${Date.now()}`, isFeatured: false };
      storageService.saveProducts([newProd, ...currentProducts]);
    }
    setIsModalOpen(false);
    refreshData();
    if (onProductsUpdated) onProductsUpdated();
  };

  const handleDeleteProduct = (id: string) => {
    if (window.confirm('Delete this cultural item?')) {
      const updated = products.filter(p => p.id !== id);
      storageService.saveProducts(updated);
      refreshData();
      if (onProductsUpdated) onProductsUpdated();
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('habesha_admin_auth');
    window.location.reload();
  };

  const NavContent = () => (
    <nav className="flex-1 p-6 space-y-3 bg-[#0E2A21]">
      <button 
        onClick={() => { setView('orders'); setIsSidebarOpen(false); }} 
        className={`w-full flex items-center space-x-4 px-6 py-4 rounded-2xl transition-all ${view === 'orders' ? 'bg-[#FBB03B] text-[#0E2A21] font-black' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
      >
        <ShoppingCart size={20} />
        <span className="uppercase text-[11px] font-bold tracking-widest">Order Feed</span>
      </button>
      <button 
        onClick={() => { setView('products'); setIsSidebarOpen(false); }} 
        className={`w-full flex items-center space-x-4 px-6 py-4 rounded-2xl transition-all ${view === 'products' ? 'bg-[#FBB03B] text-[#0E2A21] font-black' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
      >
        <Package size={20} />
        <span className="uppercase text-[11px] font-bold tracking-widest">Collections</span>
      </button>
      <button 
        onClick={() => { setView('users'); setIsSidebarOpen(false); }} 
        className={`w-full flex items-center space-x-4 px-6 py-4 rounded-2xl transition-all ${view === 'users' ? 'bg-[#FBB03B] text-[#0E2A21] font-black' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
      >
        <UsersIcon size={20} />
        <span className="uppercase text-[11px] font-bold tracking-widest">User Base</span>
      </button>
      <div className="pt-6 mt-6 border-t border-white/5">
        <button className="w-full flex items-center space-x-4 px-6 py-4 rounded-2xl text-gray-400 hover:text-white hover:bg-white/5 transition-all">
          <Settings size={20} />
          <span className="uppercase text-[11px] font-bold tracking-widest">Site Config</span>
        </button>
      </div>
    </nav>
  );

  return (
    <div className="min-h-screen bg-[#FCFBF4] flex flex-col md:flex-row overflow-x-hidden relative">
      {/* Mobile Top Navigation */}
      <div className="md:hidden bg-[#0E2A21] p-4 flex justify-between items-center sticky top-0 z-[100] w-full shadow-lg border-b border-white/5">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-[#FBB03B] text-[#0E2A21] rounded-full flex items-center justify-center font-black">A</div>
          <h2 className="text-lg font-black serif text-white">Habesha Admin</h2>
        </div>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-white p-2 hover:bg-white/10 rounded-lg transition-all">
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar - Desktop (Hidden on mobile) */}
      <aside className="hidden md:flex w-72 bg-[#0E2A21] flex-col fixed h-full z-10 border-r border-white/5">
        <div className="p-8 border-b border-white/10">
          <h2 className="text-2xl font-black serif text-[#FBB03B]">Habesha Admin</h2>
          <p className="text-[10px] text-gray-500 uppercase tracking-[0.2em] font-black mt-2">Management Hub</p>
        </div>
        <NavContent />
        <div className="p-6 border-t border-white/10">
           <button onClick={handleLogout} className="w-full flex items-center space-x-4 px-6 py-4 text-red-400 hover:bg-red-500/10 rounded-2xl transition-all font-black uppercase text-[11px] tracking-widest">
             <LogOut size={20} />
             <span>Sign Out</span>
           </button>
        </div>
      </aside>

      {/* Mobile Menu Drawer */}
      {isSidebarOpen && (
        <div className="md:hidden fixed inset-0 z-[110] bg-[#0E2A21] flex flex-col pt-16 animate-in slide-in-from-right duration-300">
           <div className="absolute top-4 right-4">
             <button onClick={() => setIsSidebarOpen(false)} className="text-white p-2">
               <X size={32} />
             </button>
           </div>
          <NavContent />
          <div className="p-6 border-t border-white/10 mt-auto">
             <button onClick={handleLogout} className="w-full flex items-center space-x-4 px-6 py-4 text-red-400 hover:bg-red-500/10 rounded-2xl transition-all font-black uppercase text-[11px] tracking-widest">
               <LogOut size={20} />
               <span>Sign Out</span>
             </button>
          </div>
        </div>
      )}

      {/* Main Content Area - Symmetric padding for balanced "right and left" */}
      <main className="flex-1 md:ml-72 bg-[#FCFBF4] w-full min-h-screen">
        <div className="max-w-[1400px] mx-auto p-4 md:p-8 lg:p-12">
          
          {/* Dashboard Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 space-y-6 sm:space-y-0">
            <div>
              <div className="flex items-center space-x-2 text-amber-600 mb-1">
                <Clock size={14} className="animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-widest">Live System Activity</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-black text-[#0E2A21] serif tracking-tight">Heritage {view}</h1>
              <p className="text-gray-400 mt-2 font-medium text-sm">Managing the digital heart of traditional excellence.</p>
            </div>
            {view === 'products' && (
              <button 
                onClick={openAddModal} 
                className="w-full sm:w-auto bg-[#0E2A21] hover:bg-[#8B0000] text-white px-8 py-5 rounded-2xl flex items-center justify-center space-x-3 shadow-xl transition-all active:scale-95 group"
              >
                <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" />
                <span className="font-black uppercase text-xs tracking-widest">New Cultural Item</span>
              </button>
            )}
          </div>

          {/* Statistics Grid - Balanced column spacing */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
             <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 flex items-center justify-between group hover:border-amber-400 transition-all duration-300 hover:shadow-xl">
                <div>
                  <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-2">Order Traffic</p>
                  <h3 className="text-4xl font-black text-[#0E2A21]">{orders.length}</h3>
                </div>
                <div className="w-16 h-16 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <TrendingUp size={32} />
                </div>
             </div>
             <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 flex items-center justify-between group hover:border-green-400 transition-all duration-300 hover:shadow-xl">
                <div>
                  <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-2">Active Catalog</p>
                  <h3 className="text-4xl font-black text-[#0E2A21]">{products.length}</h3>
                </div>
                <div className="w-16 h-16 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Package size={32} />
                </div>
             </div>
             <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 flex items-center justify-between group hover:border-blue-400 transition-all duration-300 hover:shadow-xl sm:col-span-2 lg:col-span-1">
                <div>
                  <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-2">Registered Base</p>
                  <h3 className="text-4xl font-black text-[#0E2A21]">{users.length}</h3>
                </div>
                <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <UsersIcon size={32} />
                </div>
             </div>
          </div>

          {/* Dynamic Data Views */}
          <div className="w-full">
            {view === 'orders' ? (
              <div className="bg-white rounded-[2.5rem] shadow-2xl border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto scrollbar-hide">
                  <table className="w-full text-left min-w-[850px]">
                    <thead className="bg-[#FCFBF4] text-[10px] font-black uppercase text-[#0E2A21] tracking-widest border-b border-gray-100">
                      <tr>
                        <th className="px-10 py-6">Reference ID</th>
                        <th className="px-10 py-6">Product Details</th>
                        <th className="px-10 py-6">Customer Profile</th>
                        <th className="px-10 py-6">Fulfillment</th>
                        <th className="px-10 py-6 text-right">Operations</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50 text-sm">
                      {orders.map(order => (
                        <tr key={order.id} className="hover:bg-gray-50/50 transition-colors group">
                          <td className="px-10 py-8 font-mono text-[11px] text-gray-400">#{order.id}</td>
                          <td className="px-10 py-8">
                            <div className="font-black text-[#0E2A21] text-base">{order.productName}</div>
                            <div className="flex items-center space-x-2 mt-1">
                              <span className="text-amber-600 text-[10px] font-black uppercase bg-amber-50 px-2 py-0.5 rounded">{order.size}</span>
                              <span className="text-gray-300 font-bold">•</span>
                              <span className="text-amber-600 text-[10px] font-black uppercase bg-amber-50 px-2 py-0.5 rounded">{order.color}</span>
                            </div>
                          </td>
                          <td className="px-10 py-8">
                            <div className="font-bold text-[#0E2A21]">{order.customerName}</div>
                            <div className="text-gray-400 text-xs mt-1 flex items-center space-x-1">
                              <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                              <span>{order.phone}</span>
                            </div>
                          </td>
                          <td className="px-10 py-8">
                            <span className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-tight ${
                              order.status === 'Approved' ? 'bg-green-100 text-green-700' : 
                              order.status === 'Declined' ? 'bg-red-100 text-red-700' : 
                              'bg-amber-100 text-amber-700'
                            }`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="px-10 py-8 text-right">
                            <div className="flex justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              {order.status === 'Pending' && (
                                <>
                                  <button onClick={() => handleStatusChange(order.id, 'Approved')} className="p-3 bg-green-50 text-green-600 hover:bg-green-600 hover:text-white rounded-xl transition-all shadow-sm"><CheckCircle size={18} /></button>
                                  <button onClick={() => handleStatusChange(order.id, 'Declined')} className="p-3 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white rounded-xl transition-all shadow-sm"><XCircle size={18} /></button>
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {orders.length === 0 && (
                  <div className="p-32 text-center bg-white flex flex-col items-center">
                    <div className="w-24 h-24 bg-[#FCFBF4] rounded-full flex items-center justify-center mb-6">
                      <ShoppingCart className="text-gray-200" size={48}/>
                    </div>
                    <p className="font-black text-[#0E2A21] uppercase text-xs tracking-widest">No orders in queue</p>
                  </div>
                )}
              </div>
            ) : view === 'users' ? (
              <div className="bg-white rounded-[2.5rem] shadow-2xl border border-gray-100 overflow-hidden">
                 <div className="overflow-x-auto scrollbar-hide">
                  <table className="w-full text-left min-w-[850px]">
                    <thead className="bg-[#FCFBF4] text-[10px] font-black uppercase text-[#0E2A21] tracking-widest border-b border-gray-100">
                      <tr>
                        <th className="px-10 py-6">Customer Identity</th>
                        <th className="px-10 py-6">Contact Access</th>
                        <th className="px-10 py-6">Platform Data</th>
                        <th className="px-10 py-6">Registration Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50 text-sm">
                      {users.map(u => (
                        <tr key={u.id} className="hover:bg-gray-50/50 transition-colors">
                          <td className="px-10 py-8 flex items-center space-x-4">
                            <div className="w-12 h-12 bg-[#0E2A21] text-[#FBB03B] rounded-2xl flex items-center justify-center font-black text-xl shadow-lg">
                              {u.fullName.charAt(0)}
                            </div>
                            <div>
                              <span className="font-black text-[#0E2A21] block">{u.fullName}</span>
                              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Heritage Client</span>
                            </div>
                          </td>
                          <td className="px-10 py-8">
                            <div className="font-bold text-gray-600">{u.email}</div>
                          </td>
                          <td className="px-10 py-8">
                            <div className="font-bold text-gray-600">{u.phone}</div>
                          </td>
                          <td className="px-10 py-8 text-gray-400">
                            <div className="flex items-center space-x-2">
                              <Clock size={16} className="text-amber-500" />
                              <span className="font-bold text-xs uppercase">{new Date(u.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                {products.map(product => (
                  <div key={product.id} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col group relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-2 h-full bg-amber-400 scale-y-0 group-hover:scale-y-100 transition-transform origin-top duration-500"></div>
                    <div className="flex items-center space-x-6">
                      <div className="relative shrink-0">
                        <img src={product.image} alt={product.name} className="w-24 h-24 object-cover rounded-[1.5rem] shadow-xl group-hover:scale-105 transition-transform duration-500" />
                        <span className="absolute -top-2 -right-2 bg-[#0E2A21] text-white text-[8px] font-black uppercase px-2 py-1 rounded-md">{product.category}</span>
                      </div>
                      <div className="flex-1 overflow-hidden">
                        <h4 className="font-black text-[#0E2A21] text-xl truncate serif leading-tight">{product.name}</h4>
                        <p className="text-amber-600 font-black text-lg mt-1">{product.price.toLocaleString()} ETB</p>
                      </div>
                    </div>
                    <div className="mt-10 pt-8 border-t border-gray-50 flex justify-between items-center">
                       <div className="flex space-x-2">
                          <button onClick={() => openEditModal(product)} className="p-4 bg-[#FCFBF4] text-gray-500 hover:bg-[#0E2A21] hover:text-white rounded-2xl transition-all shadow-sm">
                            <Edit3 size={18} />
                          </button>
                          <button onClick={() => handleDeleteProduct(product.id)} className="p-4 bg-red-50 text-red-400 hover:bg-red-500 hover:text-white rounded-2xl transition-all shadow-sm">
                            <Trash2 size={18} />
                          </button>
                       </div>
                       <div className="text-right">
                          <p className="text-[9px] font-black uppercase text-gray-300 tracking-[0.2em] mb-1">Catalog Entry</p>
                          <p className="text-[10px] font-bold text-[#0E2A21] font-mono">#{product.id.split('-').pop()}</p>
                       </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Item Management Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-0 md:p-8 bg-[#0E2A21]/90 backdrop-blur-md overflow-y-auto">
          <div className="bg-white w-full max-w-3xl rounded-none md:rounded-[3.5rem] shadow-2xl overflow-hidden flex flex-col h-full md:h-auto md:max-h-[92vh] animate-in zoom-in-95 duration-300">
            <div className="p-8 md:p-12 border-b flex justify-between items-center bg-[#FCFBF4]">
              <div>
                <h2 className="text-3xl font-black serif text-[#0E2A21]">{editingProduct ? 'Edit Heritage Piece' : 'New Catalog Addition'}</h2>
                <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mt-2">Item Configuration Terminal</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="p-5 bg-white shadow-sm hover:bg-[#0E2A21] hover:text-white rounded-full transition-all border border-gray-100">
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSaveProduct} className="p-8 md:p-12 space-y-8 overflow-y-auto bg-white flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-[#0E2A21] uppercase tracking-widest block ml-1">Product Title (EN)</label>
                  <input required className="w-full px-6 py-5 bg-[#FCFBF4] border-2 border-transparent focus:border-[#0E2A21] rounded-2xl outline-none font-bold text-sm transition-all" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-[#0E2A21] uppercase tracking-widest block md:text-right mr-1">Product Title (AM)</label>
                  <input required className="w-full px-6 py-5 bg-[#FCFBF4] border-2 border-transparent focus:border-[#0E2A21] rounded-2xl outline-none font-bold text-sm text-right transition-all" value={formData.nameAm} onChange={e => setFormData({...formData, nameAm: e.target.value})} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-[#0E2A21] uppercase tracking-widest block ml-1">Price (ETB)</label>
                  <input required type="number" className="w-full px-6 py-5 bg-[#FCFBF4] border-2 border-transparent focus:border-[#0E2A21] rounded-2xl outline-none font-bold text-sm transition-all" value={formData.price} onChange={e => setFormData({...formData, price: parseFloat(e.target.value)})} />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-[10px] font-black text-[#0E2A21] uppercase tracking-widest block ml-1">Collection Segment</label>
                  <select className="w-full px-6 py-5 bg-[#FCFBF4] border-2 border-transparent focus:border-[#0E2A21] rounded-2xl outline-none font-bold text-sm transition-all appearance-none" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value as Product['category']})}>
                    <option value="Women">Women's Kemis</option>
                    <option value="Men">Men's Suite</option>
                    <option value="Kids">Kids' Collection</option>
                    <option value="Accessories">Accessories</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-[#0E2A21] uppercase tracking-widest block ml-1">Visual Asset Source (URL)</label>
                <input required type="url" className="w-full px-6 py-5 bg-[#FCFBF4] border-2 border-transparent focus:border-[#0E2A21] rounded-2xl outline-none font-medium text-sm transition-all" value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-[#0E2A21] uppercase tracking-widest block ml-1">Item Narrative / Description</label>
                <textarea required rows={4} className="w-full px-6 py-5 bg-[#FCFBF4] border-2 border-transparent focus:border-[#0E2A21] rounded-2xl outline-none font-medium text-sm transition-all resize-none" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
              </div>

              <div className="pt-8">
                <button type="submit" className="w-full bg-[#0E2A21] text-white font-black py-6 rounded-3xl shadow-2xl hover:bg-[#8B0000] transition-all uppercase tracking-[0.2em] text-xs active:scale-[0.98]">
                  {editingProduct ? 'Commit Heritage Updates' : 'Publish to Global Catalog'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
