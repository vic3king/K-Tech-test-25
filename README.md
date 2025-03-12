# K Technical Assessment

## 📝 Summary

For this assessment, I went with the mono repo approach, as I believe it to be a good starting point for our application. It also gives us the flexibility to scale in gradual, maintainable steps, as each folder in this repository can be extracted and run independently.

On the backend, you will find a clear separation of different components/modules required to run a highly scalable and efficient REST API using the repository pattern. Information flows from client -> controller -> middleware -> service -> repository -> db, each part making use of various smaller patterns, like Single Responsibility and DI, which are most commonly used.

As of today, we have two main endpoints, with one not being used on the front end. Our app is more focused on the GET /comms/your-next-delivery/:userId endpoint. This endpoint on the frontend component mount uses Axios and React Query to fetch our data from the backend. I slightly modified the response object to include cats' information, which I needed to display a more complete details modal.

On the backend, I focused on solving the templating problem. I had many options to achieve this, including using regex to find and update my template strings with accurate data. However, this would not be easily readable and would prove hard to maintain in the long run. So, I went with Handlebars as my preferred templating engine, which is a robust and well-maintained package for handling templates.

Information on this endpoint flows from a client request to my controller, which talks to my comms service. The comms service talks to my templating engine, which in turn gets the right template to use from a repository/db model for templates. I decided to handle templates as their entity because, in the future, changes will be made to these templates, and new templates will likely be added. This approach means we can make these updates and changes to our templates without having to make a code change or deployment.

I also added:
- Swagger documentation
- Robust test suites covering unit tests and integration tests
- Security middleware (Helmet)
- Cookie parser for proper JSON data handling

Future improvements could include:
- Better cat management system(CRUD)
- Ability to modify and or extend pricing data management for pouch sizes
- Media management for our furry friends
- Standardized template approach (e.g., use of <> vs {{}})
- Dynamic delivery date handling(currently hardcoded to 2 days)
- Notification tracking system(When was it last sent? retries etc)
- CI/CD pipeline
- Containerized app
- Authentication system etc

The frontend is a simple single page app built using Next.js and Tailwind. It uses a custom hook for data fetching which is an abstraction of react query and axios.

This app has components for:
- Delivery Card (Main page)
- Delivery Card Error
- Skeleton loader
- React Query and Axios setup for data fetching

Overall, I believe this to be a great assessment that mirrors real-world challenges and tests key technical skills needed for the role.

## 🔧 Tech Stack

- **Backend**
  - `NestJS`
  - `TypeScript`
  - `REST API`
  
- **Frontend**
  - `Next.js`
  - `React`
  - `TypeScript`
  - `Tailwind CSS`

## 📡 API Endpoints

- **`GET /comms/welcome-fresh/:userId`** - Welcome message for new users
- **`GET /comms/your-next-delivery/:userId`** - Next delivery information

## 💻 Development

- Backend runs on: **`http://localhost:4000`**
  - API Swagger Documentation: **`http://localhost:4000/docs`**
- Frontend runs on: **`http://localhost:3000`**
  - Visit the app at: **`http://localhost:3000/welcome/ff535484-6880-4653-b06e-89983ecf4ed5`**

### Running the Project

#### Option 1: Using the Shell Script (Recommended)
1. Make the script executable and run it:
```bash
chmod +x run-app.sh
./run-app.sh
```
This will automatically:
  - Install dependencies for both frontend and backend
  - Start the backend server on port 4000
  - Start the frontend server on port 3000
  - Kill any existing processes on these ports

#### Option 2: Manual Setup

##### Backend
1. Install dependencies and start server
   See [backend/README.md](backend/README.md) for detailed instructions.

##### Frontend
1. Install dependencies and start server
   See [frontend/README.md](frontend/README.md) for detailed instructions.

## 🧪 Features

- Welcome endpoint
- Get the custom delivery message

## 📝 Environment Variables

### Frontend

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 📸 Screenshots

### Main Delivery Card
![Main Delivery Card](/frontend/public/Screenshot%202025-03-12%20at%2015.51.33.png)
*Main delivery card showing next delivery information*

### Delivery Details Modal
![Delivery Details Modal](/frontend/public/Screenshot%202025-03-12%20at%2015.51.40.png)
*Detailed view showing all cats and delivery information*
