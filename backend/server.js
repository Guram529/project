import express from "express";


import { User } from "./models/User.js";
import { verifyAuth } from "./middleware/verifyAuth.js";

dotenv.config({ path: "./config/.env" });

const app = express();

app.use(
  cors({
    origin: process.env.ALLOWED_ORIGIN,
    credentials: true,
  })
);

app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
      sameSite: true,
    },
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URL,
    }),
  })
);

app.get("/user/status", verifyAuth, async (req, res) => {
  return res.json({ user: req.user });
});

app.post("/user/register", async (req, res) => {
  const { email, username, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    email,
    username,
    password: hashedPassword,
  });

  req.session.userId = newUser._id;

  res.json({
    user: { username: newUser.username, email: newUser.email },
  });
});

app.post("/user/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).lean();

  if (user && (await bcrypt.compare(password, user.password))) {
    const { password, ...rest } = user;
    req.session.userId = rest._id.toString();
    res.json({ user: rest });
  } else {
    res.status(401).json({ message: "Invalid username or password" });
  }
});

app.delete("/user/logout", async (req, res) => {
    req.session.destroy()
    res.clearCookie("connect.sid")
    res.sendStatus(204)
  })

  app.listen(process.env.EXPRESS_PORT, async () => {
    console.log("Server running...")
    try {
      const conn = await mongoose.connect(process.env.MONGODB_URL)
      console.log(`MongoDB connected: ${conn.connection.host}`)
    } catch (err) {
      console.error(err)
    }
  })
