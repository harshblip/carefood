<div align="center">
  
<img src="/public/personal/forgithub.png" alt="Circular Image" width="700" height="250">

</div>
<h3 align="center"> Your Go-To Food Delivery App with Heart  </h3>

<p align="center">
     <img src = "https://img.shields.io/badge/Prisma-5849BE?style=for-the-badge&logo=Prisma&logoColor=white" />
     <img src = "https://img.shields.io/badge/nextjs-%23000000.svg?style=for-the-badge&logo=next.js&logoColor=white" />
     <img src = "https://img.shields.io/badge/mongodb-%2347A248.svg?style=for-the-badge&logo=mongodb&logoColor=white" />
     <img src = "https://img.shields.io/badge/redux-%23311C87.svg?style=for-the-badge&logo=redux&logoColor=white" />
     <img src = "https://img.shields.io/badge/JWT-%23000000.svg?style=for-the-badge&logo=json-web-tokens&logoColor=white" />
 </p>

 <div align="center">
   
   [![forthebadge](https://forthebadge.com/images/badges/built-with-love.svg)](https://github.com/harshblip/carefood)
 
 </div>

<h2> Description </h2>
<p>
  Carefood isn't your average food delivery service—it's a platform with a purpose. Imagine a sleek, user-friendly app that not only lets you order from your favorite restaurants but also lets you make a positive difference in the world.
  
  With Carefood, you can easily explore nearby eateries, customize your orders while knowing that every meal you order can help someone in need. Whether you're treating yourself or giving back to the community, Carefood's state-of-art design ensures a seamless experience every time.
</p>

<h2> Backend on this app </h2>
<p>
  Carefood's backend, powered by Next.js, MongoDB, and Prisma, serves as the backbone of the application, facilitating seamless communication between the frontend and the database. The integration of MongoDB as the database provides scalability and flexibility, allowing Carefood to handle large volumes of data efficiently.

  The backend employs JSON Web Tokens (JWT) for user authentication, ensuring secure access to the platform's features. Middleware functions are implemented to handle tasks such as token verification, error handling, and route protection, enhancing the overall security and reliability of the application.

JWTs provide a secure and efficient means of authentication, allowing them to access their accounts and perform actions within the application with confidence. With JWTs, users can enjoy seamless and uninterrupted access to their accounts across different devices and sessions, eliminating the need for frequent logins.

One of the standout features of JWT-based authentication is automatic token refreshing, a functionality that simplifies the user experience and ensures continuous access to application resources. With automatic token refreshing, users no longer need to manually log in and out to generate new JWT tokens, saving time and reducing friction in the authentication process. Instead, JWT tokens are automatically refreshed and extended, seamlessly maintaining user sessions and preserving application state. This feature not only enhances user convenience but also improves application security by reducing the likelihood of expired tokens and unauthorized access attempts.
</p>

<h2> Figma Design of Carefood </h2>

```link
https://www.figma.com/file/6BLOvvqFCjK9azoWiSzik2/carefood?type=design&node-id=0-1&mode=design&t=MylUs64l9iFmYBOA-0
```
<h2> Userflow of Carefood </h2>

```
https://whimsical.com/carefood-6Kw8i1JUGndnsnJSL9bCHT
```

<h2>
  Installation and Setup
</h2>

<p>
  Clone this repository and install dependencies by running:

  ```bash
npm install
#or
yarn install
```

Create a new file named `config.env` with the following environment variables in the root of the project folder:
``` env
DATABASE_URL = 

NEXTAUTH_URL = 

NEXTAUTH_URL_INTERNAL = 

JWT_SECRET = 
```

Create a new file named `.env.local` with following configuration:
``` env
NEXT_PUBLIC_BASE_URL = http://localhost:4000
```

For development mode, run:
```bash
npm run dev
```

For production mode, run:
```bash
npm run build
npm start
```
</p>
