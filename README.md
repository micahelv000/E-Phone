# E-Phone

E-Phone is a smart e-commerce website dedicated to buying and selling phones. It offers a seamless and efficient platform for both customers and administrators. The platform integrates with external APIs to fetch the latest phones, ensuring that users have access to the newest models on the market.

## Features

### User Features
- **Browse Phones**: Users can explore a wide range of phones, all fetched from an external API to ensure the latest models are available.
- **Purchase Phones**: A smooth and secure checkout process allows users to purchase their desired phones.
- **Transaction History**: Users can view their previous transactions and keep track of their purchases.

### Admin Features
- **Smart Admin Panel**: The admin panel is designed to provide administrators with full control over the website.
- **Manage Phones**: Admins can add new phones, update existing phone details, and change prices as needed.
- **Analytics Dashboard**: View comprehensive analytics about website performance, user activities, and sales.
- **User Management**: Admins can view, edit, and manage user details and transaction records.
- **Transaction Management**: Admins have the ability to oversee and modify transaction details when necessary.

## Technology Stack

- **Frontend**: Built with modern web technologies for a responsive and user-friendly interface.
- **Backend**: Robust backend system handling all business logic and integrations with external APIs.
- **Database**: Secure and efficient database management for storing user and transaction information.
- **APIs**: Integration with external APIs to fetch the latest phone models and their details.

## Getting Started

### Prerequisites
- Node.js
- NPM (Node Package Manager)
- MongoDB (or any other database system of choice)

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/e-phone.git
   cd e-phone
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**
   Create a `.env` file in the root directory and add your environment variables:
   ```plaintext
   DATABASE_URL=mongodb://localhost:27017/e-phone
   API_KEY=your_api_key
   ```

4. **Run the Application**
   ```bash
   npm start
   ```
   Runs both the client and server concurrently. The client is served on http://localhost:3000 and the server on http://localhost:5000.



5. **Access the Website**
   Open your browser and navigate to `http://localhost:3000` to view the E-Phone website.

## Usage

### User Operations
- **Sign Up/Login**: Create an account or log in to access personalized features.
- **Browse and Buy**: Explore the catalog and purchase phones.
- **View Transactions**: Check your past transactions and order details.

### Admin Operations
- **Login**: Access the admin panel with your credentials.
- **Manage Phones**: Add, update, or reprice phones as needed.
- **View Analytics**: Monitor website performance and user activities.
- **Manage Users and Transactions**: Oversee and modify user and transaction details when necessary.


## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

---

Thank you for using E-Phone! We hope you enjoy the experience. If you have any questions or need assistance, please feel free to contact us.
