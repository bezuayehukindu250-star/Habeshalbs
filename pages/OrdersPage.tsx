
import React, { useState, useEffect } from 'react';
import { storageService } from '../services/storageService';
import { Order, Language, Translation, User } from '../types';
import { Package, Clock, CheckCircle, XCircle } from 'lucide-react';

interface Props {
  lang: Language;
  t: Translation;
  user: User;
}

const OrdersPage: React.FC<Props> = ({ lang, t, user }) => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    setOrders(storageService.getOrdersByUser(user.id));
  }, [user.id]);

  const getStatusDisplay = (status: Order['status']) => {
    switch (status) {
      case 'Pending':
        return { 
          icon: <Clock size={16} />, 
          text: t.statusPending, 
          className: 'bg-amber-100 text-amber-700' 
        };
      case 'Approved':
        return { 
          icon: <CheckCircle size={16} />, 
          text: t.statusApproved, 
          className: 'bg-green-100 text-green-700' 
        };
      case 'Declined':
        return { 
          icon: <XCircle size={16} />, 
          text: t.statusDeclined, 
          className: 'bg-red-100 text-red-700' 
        };
      default:
        return { 
          icon: <Clock size={16} />, 
          text: status, 
          className: 'bg-gray-100 text-gray-700' 
        };
    }
  };

  return (
    <div className="bg-[#FCFBF4] min-h-screen py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-black text-[#0E2A21] serif mb-4">{t.navOrders}</h1>
          <p className="text-gray-500 font-medium">Tracking your cultural heritage delivery for {user.fullName}.</p>
        </div>

        <div className="space-y-6">
          {orders.map(order => {
            const status = getStatusDisplay(order.status);
            return (
              <div key={order.id} className="bg-white rounded-3xl p-8 shadow-sm border-2 border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all hover:shadow-lg">
                <div className="flex items-center space-x-6">
                  <div className="w-16 h-16 bg-[#FCFBF4] rounded-2xl flex items-center justify-center text-[#0E2A21] border border-gray-100">
                    <Package size={32} />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-[#0E2A21] serif">{order.productName}</h3>
                    <p className="text-gray-500 text-sm mt-1">Order ID: <span className="font-mono text-xs">#{order.id}</span></p>
                    <div className="flex items-center space-x-3 mt-2">
                       <span className="text-xs font-bold text-amber-600 uppercase">{order.size}</span>
                       <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                       <span className="text-xs font-bold text-amber-600 uppercase">{order.color}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col md:items-end space-y-3">
                   <div className={`px-4 py-2 rounded-full flex items-center space-x-2 text-xs font-black uppercase tracking-tighter ${status.className}`}>
                      {status.icon}
                      <span>{status.text}</span>
                   </div>
                   <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                     Placed on {new Date(order.createdAt).toLocaleDateString()}
                   </p>
                </div>
              </div>
            );
          })}

          {orders.length === 0 && (
            <div className="bg-white rounded-[3rem] p-32 text-center border-2 border-dashed border-gray-200">
              <Package className="mx-auto mb-6 text-gray-200" size={64} />
              <h3 className="text-2xl font-black text-[#0E2A21] serif">No orders found</h3>
              <p className="text-gray-500 mt-2 font-medium">Your heritage collection is waiting for you in the shop!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
