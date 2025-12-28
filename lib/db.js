let users = [];
let bookings = [];

export const db = {
    // User operations
    users: {
        create: async (userData) => {
            const user = {
                id: Date.now().toString(),
                ...userData,
                createdAt: new Date().toISOString()
            };
            users.push(user);
            return user;
        },

        findByEmail: async (email) => {
            return users.find(u => u.email === email);
        },

        findById: async (id) => {
            return users.find(u => u.id === id);
        },

        getAll: async () => {
            return users;
        }
    },

    // Booking operations
    bookings: {
        create: async (bookingData) => {
            const booking = {
                id: Date.now().toString(),
                ...bookingData,
                status: 'Pending',
                createdAt: new Date().toISOString()
            };
            bookings.push(booking);
            return booking;
        },

        findById: async (id) => {
            return bookings.find(b => b.id === id);
        },

        findByUserId: async (userId) => {
            return bookings.filter(b => b.userId === userId);
        },

        update: async (id, updateData) => {
            const index = bookings.findIndex(b => b.id === id);
            if (index !== -1) {
                bookings[index] = { ...bookings[index], ...updateData };
                return bookings[index];
            }
            return null;
        },

        delete: async (id) => {
            const index = bookings.findIndex(b => b.id === id);
            if (index !== -1) {
                bookings.splice(index, 1);
                return true;
            }
            return false;
        },

        getAll: async () => {
            return bookings;
        }
    }
};

//some demo data
if (users.length === 0) {
    users.push({
        id: '1',
        name: 'Demo User',
        email: 'demo@care.xyz',
        password: '$2a$10$8Z9Q8Z9Q8Z9Q8Z9Q8Z9Q8uKxN7N7N7N7N7N7N7N7N7N7N7N7N7N7N', // hashed 'Demo123'
        nid: '1234567890',
        contact: '+8801712345678',
        createdAt: new Date().toISOString()
    });
}