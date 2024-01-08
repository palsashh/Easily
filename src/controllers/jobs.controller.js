import JobsModel from "../models/jobs.model.js";
import UserModel from "../models/user.model.js";

export default class JobsController {

    getHome(req, res) {
        res.render('home', {userEmail: req.session.userEmail});
    }
    getJobList(req, res) {
        let jobs = JobsModel.getJobs();
        res.render('job_list', { jobs });
    }
    jobDetailsById(req, res) {
        const id = req.params.id;
        const jobFound = JobsModel.jobById(id);
        if (jobFound) {
            res.render('jobseeker_jobdetails', { jobs: jobFound ,userEmail: req.session.userEmail});
        } else {
            res.render('err', {errorMsg:'Not Found'});
        }
    }
    postNewJob(req, res){
        const {email, password}= req.body;
        const user = UserModel.isValidUser(email, password);
        if(!user){
          return  res.render('err',{errorMsg :'only recruiter is allowed to access this page, login as recruiter to continue'})
        }
        res.render('new_job',{userEmail: req.session.userEmail});
        
    }
    newJob(req, res) {
        JobsModel.newJob(req.body);
        let jobs = JobsModel.getJobs();
        res.render('job_list', { jobs ,userEmail: req.session.userEmail});
    }
    updateJob(req, res) {
        JobsModel.update(req.body);
        let jobs = JobsModel.getJobs();
        console.log(jobs)
        res.render('job_list', { jobs, userEmail: req.session.userEmail });
    }
    deleteJob(req, res) {
        const id = req.params.id;
        const jobFound = JobsModel.jobById(id);
        if (!jobFound) {
            res.status(401).send('Job not found')        }
        JobsModel.delete(id);
        let jobs = JobsModel.getJobs();
        res.render('job_list', { jobs });
    }
    getApplicantsById(req, res) {
        const id = req.params.id;
        const {email, password}= req.body;
        const user = UserModel.isValidUser(email, password);
        if(!user){
          return  res.render('err',{errorMsg :'only recruiter is allowed to access this page, login as recruiter to continue'})
        }
        let applicantList = JobsModel.getApplicants(id);
        res.render('applicant_list', { applicantList,userEmail: req.session.userEmail });
    }
    addApplicantById(req, res) {
        console.log(req.body)
        const id = req.params.id;
        JobsModel.addApplicant(id, req.body)
    }
    getApplicantDetail(req, res) {
        console.log(req.body)
        const applicantId = req.params.applicantId;
        let applicant = JobsModel.getApplicantDetailbyApplicantId(applicantId);

    }
    updateApplicantDetail(req, res) {
        console.log(req.body)
        JobsModel.updateApplicantDetailByApplicantId(req.body);
        const id = req.params.id;
        let applicantList = JobsModel.getApplicants(id);
        res.render('applicant_list', { applicantList ,userEmail: req.session.userEmail});

    }
    deleteApplicantDetail(req, res) {
        console.log(req.body)
        const applicantId = req.params.applicantId;
        JobsModel.deleteApplicantByApplicantId(applicantId);
        const id = req.params.id;
        let applicantList = JobsModel.getApplicants(id);
        res.render('applicant_list', { applicantList,userEmail: req.session.userEmail });
    }
    updateForm(req, res){
        const id = req.params.id;
        const jobFound = JobsModel.jobById(id);
        res.render('update_job',{jobs:jobFound});
    }
    jobApply(req, res){
        const id = req.params.id;
        const{name, email, contact}= req.body;
        const resume = 'resumes/' + req.file.filename;
        JobsModel.addApplicant(id,name, email, contact, resume);
        
        const jobFound = JobsModel.jobById(id);
        if (jobFound) {
            res.render('job_list', { jobs: jobFound,userEmail: req.session.userEmail });
        } else {
            res.render('err',{errorMsg:'Not Found'});
        }
    }
    search(req, res){
        console.log(req.body);
        res.render('job_list',{jobs: JobsModel.searchResult(req.body.companyName),userEmail: req.session.userEmail});
      };

}