# E-Phone
![logo](https://github.com/user-attachments/assets/fc2eb840-5813-4627-a846-97979cae9e14)

E-Phone is a smart e-commerce website dedicated to buying and selling phones. It offers a seamless and efficient platform for both customers and administrators. The platform integrates with external APIs to fetch the latest phones, ensuring that users have access to the newest models on the market.

## Technology Stack

| Component         | Technology                                                                                                                  |
|-------------------|-----------------------------------------------------------------------------------------------------------------------------|
| **Frontend**      | React with [create-react-app](https://github.com/facebook/create-react-app)                                                 |
| **Backend**       | [Express](https://github.com/expressjs/express)                                                                             |
| **Database**      | MongoDB                                                                                                                     |
| **External APIs** | [Phone Specs API](https://github.com/azharimm/phone-specs-api) <br>[YouTube API](https://developers.google.com/youtube/v3)  |
| **File Storage**  | [Nextcloud WebDAV](https://docs.nextcloud.com/server/20/user_manual/en/files/access_webdav.html#accessing-files-using-curl) |

## Getting Started

### Prerequisites
- [Node.js & npm](https://nodejs.org/en/download/package-manager)

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/micahelv000/E-Phone.git
   cd e-phone
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**
   Edit the `.env` file in the server directory and add your environment variables.

### Running the Application

#### Running in Development Mode with npm
   ```bash
   npm start
   ```

#### Running in Production Mode with pm2
1. **Install pm2 Globally**
   ```bash
   npm install pm2 -g
   ```
2. **Start The Application**
   ```bash
   pm2 start ecosystem.config.js
   ```
   
Both methods will start the server and client applications. The server will run on port 5000, and the client will run on port 3000.

## Features and Usage

### User Features
- **Sign Up/Login**: Create an account or log in to access personalized features.
- **Browse Phones**: Explore a wide range of phones, all fetched from an external API to ensure the latest models are available.
- **Purchase Phones**: A smooth and secure checkout process allows users to purchase their desired phones.
- **Transaction History**: View previous transactions and keep track of purchases.
- **Profile Management**: Edit personal details, password, and profile picture. View profile information.
- **Cart Management**: Add or remove items from the cart.
- **Phone Details**: View detailed information about a specific phone, including specifications and related videos.

### Admin Features
- **Login**: Access the admin panel with credentials.
- **Manage Phones**: Add new phones, update existing phone details, and change prices.
- **Analytics Dashboard**: View comprehensive analytics about website performance, user activities, and sales.
- **User Management**: View, edit, and manage user details and transaction records.
- **Transaction Management**: Oversee and modify transaction details when necessary.

## License
[E-Phone](https://github.com/micahelv000/E-Phone) by Liav Mordouch and Michael Volobuev is licensed under [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International](https://creativecommons.org/licenses/by-nc-sa/4.0/?ref=chooser-v1)

---

Thank you for using E-Phone! We hope you enjoy the experience. If you have any questions or need assistance, please feel free to contact us.
