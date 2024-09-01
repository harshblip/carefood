<div align="center">
  
<img src="/public/personal/forgithub.png" alt="Circular Image" width="580" height="200">

</div>
<h3 align="center"> Your Go-To Food Delivery App with Heart ❤ </h3>

<p align="center">
     <img src = "https://img.shields.io/badge/React-219ebc?style=for-the-badge&logo=React&logoColor=white" />
     <img src = "https://img.shields.io/badge/Prisma-5849BE?style=for-the-badge&logo=Prisma&logoColor=white" />
     <img src = "https://img.shields.io/badge/nextjs-%23000000.svg?style=for-the-badge&logo=next.js&logoColor=white" />
     <img src = "https://img.shields.io/badge/mongodb-%2347A248.svg?style=for-the-badge&logo=mongodb&logoColor=white" />
     <img src = "https://img.shields.io/badge/redux-%23311C87.svg?style=for-the-badge&logo=redux&logoColor=white" />
     <img src = "https://img.shields.io/badge/JWT-%23000000.svg?style=for-the-badge&logo=json-web-tokens&logoColor=white" />
 </p>

<h2> 🌟 Description 🌟</h2>
<p> 
<strong>carefood</strong> is a nice food delivery app built 🚀 with <strong>Next.js</strong> and <strong>MongoDB</strong>, featuring a solid backend integration unlike any other fullstack food delivery app. Leveraging <strong>Swiggy's</strong> powerful API, carefood offers an unmatched browsing experience 🎉 with a <strong>sleek</strong> and <strong>intuitive UI</strong>. Users can effortlessly choose their city, explore a wide range of 🎉 restaurants, and view complete details just like on Swiggy. This app makes full use of Swiggy's extensive API, delivering a smoother and more visually appealing experience for food lovers everywhere 🚀.
</p>

<h2> ✨ Frontend 📐 </h2>
  <h3>🎨 Frontend Excellence with Next.js, React, and Tailwind CSS</h3>
The frontend of <strong>carefood</strong> is crafted using <strong>Next.js</strong>, <strong>React</strong>, and <strong>Tailwind CSS</strong>, delivering a responsive and visually stunning user interface. The focus is on providing a seamless, enjoyable browsing experience that stands out for its simplicity and elegance.

<h3>🌍 API Integration for Rich Data</h3>
<strong>carefood</strong> leverages the <strong>Mapbox API</strong> to help users effortlessly search for relevant locations based on their input. For restaurant information, the app utilizes the <strong>Swiggy API</strong> to fetch a wealth of data including restaurant names, ratings, addresses, discounts, average delivery times, number of ratings, and cuisines. 🍽️ Despite the <strong>complexity</strong> of Swiggy’s nested data, CareFood effectively presents all necessary information in a clean and <strong>organized</strong> manner.

<h3>🔍 Multi-Filter and Sorting Options</h3>
To enhance user experience, carefood offers <strong>multi-filtering</strong> options that allow users to filter restaurants based on <strong>multiple</strong> criteria simultaneously—such as whether a restaurant is open or closed, vegetarian or non-vegetarian options, and a rating of 4.0 or higher ⭐. Additionally, users can <strong>sort</strong> the filtered results by factors like <strong>cost for two</strong> or <strong>rating</strong>, providing a tailored browsing experience.

<h3>✨ Clean and Pleasing UI</h3>
The UI is designed to be <strong>unique</strong>, <strong>smooth</strong>, and <strong>clean</strong>, making it easy to navigate through the cluttered and nested data fetched from Swiggy's API. The design focuses on <strong>clarity</strong> and visual appeal, ensuring that users enjoy a smooth browsing experience without feeling overwhelmed by information.

<h3>📱 Responsive Design Across Devices</h3>
Every page in carefood features a <strong>responsive design</strong>, maintaining a consistent, <strong>clean</strong>, and <strong>smooth UI</strong> across all screen sizes and devices. Whether on a desktop, tablet, or smartphone, the user experience remains unaffected, providing a seamless browsing experience everywhere. 💻📱

<h2>⚙️ Backend 🛠️</h2>
<h3>🔑 JWT-Based Secure Authentication</h3>
CareFood uses <strong>JWT</strong> (JSON Web Tokens) for secure user authentication. Each request includes a <strong>JWT</strong> token in the headers, allowing the backend to verify the user's identity and validity. This ensures that only authenticated users can access specific features and data, maintaining a high level of security throughout the app.

<h3>♻️ Automatic Token Refreshing</h3>
To enhance user experience, CareFood incorporates an <strong>automatic token refreshing</strong> mechanism. Instead of forcing users to log out and sign in again when their token expires, the app uses <strong>middleware</strong> to automatically check token validity. If a token is expired, it <strong>refreshes</strong> the token using a refresh token without disrupting the user experience, ensuring a seamless and <strong>uninterrupted</strong> session.

<h3>⚡ Optimized Database Queries with Prisma and MongoDB</h3>
The app utilizes <strong>Prisma</strong> as an ORM (Object-Relational Mapping) tool with <strong>MongoDB</strong>, enabling highly <strong>optimized</strong> and efficient queries to the database. This setup ensures fast data retrieval and minimal load times, contributing to a smooth and responsive user experience on the frontend.

<h3>📊 Dynamic Data Management on the Backend</h3>
All user data, from signup to cart management, is <strong>dynamically</strong> handled on the backend. When users add or modify items in their cart, these changes are instantly reflected in the backend database. The system automatically manages cart dynamics, such as deleting items when their quantity reaches zero and updating prices based on quantity changes, ensuring accuracy.

<h2> 🔐 JWT 🔑 </h2>
<p>
JWTs provide a secure and efficient means of authentication, allowing them to access their accounts and perform actions within the application with confidence. With JWTs, users can enjoy seamless and uninterrupted access to their accounts across different devices and sessions, eliminating the need for frequent logins.

One of the standout features of JWT-based authentication is automatic token refreshing, a functionality that simplifies the user experience and ensures continuous access to application resources. With automatic token refreshing, users no longer need to manually log in and out to generate new JWT tokens, saving time and reducing friction in the authentication process. Instead, JWT tokens are automatically refreshed and extended, seamlessly maintaining user sessions and preserving application state. This feature not only enhances user convenience but also improves application security by reducing the likelihood of expired tokens and unauthorized access attempts.
</p>
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

Create a new file named `.env` with the following environment variables in the root of the project folder:
``` env
GOOGLE_CLIENT_ID =
GOOGLE_CLIENT_SECRET =
DATABASE_URL =
NEXTAUTH_SECRET =
NEXTAUTH_URL =
NEXTAUTH_URL_INTERNAL =
JWT_SECRET =
NEXT_PUBLIC_MAPBOX_SESSION_SECRET =
NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN =
NEXT_PUBLIC_MAPBOX_URL =
NEXT_PUBLIC_MAPBOX_SESSION_SECRET =
NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN =
NEXT_PUBLIC_SWIGGY_API =
NEXT_PUBLIC_SWIGGY_MENU =
```

Run
```bash
npx prisma db push
```
then
```bash
nps prisma generate
```
to generate/create prisma schema in your mongodb collection

To start the application, run:
```bash
npm run dev
```
to run the app on ```localhost:3000```
</p>
