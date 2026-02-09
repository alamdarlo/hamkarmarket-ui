import { Order } from './../types/product';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type OrderState = {
  orderList: Order[];
  addOrder: (order: Order) => void;
  addOrders: (orders: Order[]) => void;
  updateOrder: (orderId: number, updatedData: Partial<Order>) => void;
  deleteOrder: (orderId: number) => void;
  removeAll: () => void;
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
  getOrderById: (orderId: number) => Order | undefined;
  getOrdersByType: (type: 'buy' | 'sell') => Order[];
  getOrdersByStatus: (status: Order['status']) => Order[];
  getOrdersByProduct: (productId: number) => Order[];
  getTotalOrdersValue: () => number;
  //getTodayOrders: () => Order[];
  getOrdersCount: () => number;
  clearCompletedOrders: () => void;
};

export const useOrderStore = create<OrderState>()(
  persist(
    (set, get) => ({
      // State
      orderList: [],
      isLoading: false,

      // Actions
      addOrder: (order: Order) => {
        set((state) => ({
          orderList: [...state.orderList, {
            ...order,
            createdAt: order.createdAt || new Date().toISOString(),
          }],
        }));
      },

      addOrders: (orders: Order[]) => {
        set((state) => ({
          orderList: [...state.orderList, ...orders.map(order => ({
            ...order,
            createdAt: order.createdAt || new Date().toISOString(),
          }))],
        }));
      },

      updateOrder: (orderId: number, updatedData: Partial<Order>) => {
        set((state) => ({
          orderList: state.orderList.map((order) =>
            order.id === orderId
              ? {
                  ...order,
                  ...updatedData,
                  updatedAt: new Date().toISOString(),
                }
              : order
          ),
        }));
      },

      deleteOrder: (orderId: number) => {
        set((state) => ({
          orderList: state.orderList.filter((order) => order.id !== orderId),
        }));
      },

      removeAll: () => {
        set({ orderList: [] });
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },

      // Selectors/Getters
      getOrderById: (orderId: number) => {
        return get().orderList.find((order) => order.id === orderId);
      },

      getOrdersByType: (type: 'buy' | 'sell') => {
        return get().orderList.filter((order) => order.type === type);
      },

      getOrdersByStatus: (status: Order['status']) => {
        return get().orderList.filter((order) => order.status === status);
      },

      getOrdersByProduct: (productId: number) => {
        return get().orderList.filter((order) => order.productId === productId);
      },

      getTotalOrdersValue: () => {
        return get().orderList.reduce((total, order) => total + order.totalPrice , 0);
      },

    //   getTodayOrders: () => {
    //     const today = new Date().toISOString().split('T')[0];
    //     return get().orderList.filter((order) =>
    //       order.createdAt.startsWith(today)
    //     );
    //   },

      getOrdersCount: () => {
        return get().orderList.length;
      },

      clearCompletedOrders: () => {
        set((state) => ({
          orderList: state.orderList.filter((order) => order.status !== 'completed'),
        }));
      },

    }),
    {
      name: 'order-storage', // نام کلید در localStorage
      storage: createJSONStorage(() => localStorage), // یا sessionStorage
      partialize: (state) => ({ orderList: state.orderList }), // فقط orderList ذخیره شود
      version: 1, // برای migrations
      // migrate: (persistedState, version) => {
      //   if (version === 0) {
      //     // migration logic
      //   }
      //   return persistedState as OrderState;
      // },
    }
  )
);

// Hook‌های کمکی برای استفاده راحت‌تر
export const useOrders = () => useOrderStore((state) => state.orderList);
export const useOrdersLoading = () => useOrderStore((state) => state.isLoading);
export const useSetOrdersLoading = () => useOrderStore((state) => state.setLoading);
export const useAddOrder = () => useOrderStore((state) => state.addOrder);
export const useUpdateOrder = () => useOrderStore((state) => state.updateOrder);
export const useDeleteOrder = () => useOrderStore((state) => state.deleteOrder);

// Selector hooks
export const usePendingOrders = () => 
  useOrderStore((state) => state.getOrdersByStatus('pending'));

export const useCompletedOrders = () => 
  useOrderStore((state) => state.getOrdersByStatus('completed'));

export const useBuyOrders = () => 
  useOrderStore((state) => state.getOrdersByType('buy'));

export const useSellOrders = () => 
  useOrderStore((state) => state.getOrdersByType('sell'));

export const useTotalOrdersValue = () => 
  useOrderStore((state) => state.getTotalOrdersValue());

// export const useTodayOrders = () => 
//   useOrderStore((state) => state.getTodayOrders());

export const useOrdersCount = () => 
  useOrderStore((state) => state.getOrdersCount());

// Hook ترکیبی برای دیتای آماری
export const useOrdersStats = () => {
  const buyOrders = useBuyOrders();
  const sellOrders = useSellOrders();
  const pendingOrders = usePendingOrders();
  const completedOrders = useCompletedOrders();
  const totalValue = useTotalOrdersValue();
//   const todayOrders = useTodayOrders();
  const totalCount = useOrdersCount();

  return {
    buyOrders,
    sellOrders,
    pendingOrders,
    completedOrders,
    totalValue,
    // todayOrders,
    totalCount,
    buyOrdersCount: buyOrders.length,
    sellOrdersCount: sellOrders.length,
    pendingOrdersCount: pendingOrders.length,
    completedOrdersCount: completedOrders.length,
    // todayOrdersCount: todayOrders.length,
    averageOrderValue: totalCount > 0 ? totalValue / totalCount : 0,
  };
};