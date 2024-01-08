import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import ejsLayouts from "express-ejs-layouts";
import JobsController from "./src/controllers/jobs.controller.js";
import { uploadFile } from "./middlewares/file-upload.middleware.js";
import UserController from "./src/controllers/user.controller.js";
import { setLastVisit } from "./middlewares/lastVisit.middleware.js";

const app = express();
app.use(express.static('public'));
app.use(cookieParser());

app.use(session({
  secret: 'SecretKey',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false },
}));

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");
app.set("views", "./src/views");

app.use(ejsLayouts);

const jobsController = new JobsController();
const usercontroller = new UserController();

// Auth routes
app.post('/register', usercontroller.postRegister);
app.get('/login', usercontroller.getLogin)
app.post('/login', usercontroller.postLogin);
app.post('/logout', usercontroller.logout);

// Job routes
app.get('/', setLastVisit, jobsController.getHome);
app.get('/jobs', jobsController.getJobList);
app.get('/postjob',jobsController.postNewJob);
app.post('/jobs', jobsController.newJob);
app.get('/jobs/:id', jobsController.jobDetailsById)
app.put('/jobs/:id', jobsController.updateJob);
app.delete('/jobs/:id', jobsController.deleteJob);

app.get('/jobs/applicants/:id', jobsController.getApplicantsById);
app.post('/jobs/applicants/:id', jobsController.addApplicantById);
app.get('/jobs/applicants/:applicantId', jobsController.getApplicantDetail);
app.put('/jobs/applicants/:applicantId', jobsController.updateApplicantDetail);
app.delete('/jobs/applicants/:applicantId', jobsController.deleteApplicantDetail);

app.get('/jobs/update/:id', jobsController.updateForm);
app.post('/jobs/update/:id', jobsController.updateJob);

app.get('/jobs/delete/:id', jobsController.deleteJob);

app.post('/apply/:id',uploadFile.single('resumePath'), jobsController.jobApply);

app.post("/search", jobsController.search);


export default app;