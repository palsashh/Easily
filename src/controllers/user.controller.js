import UserModel from "../models/user.model.js";
import JobsModel from "../models/jobs.model.js";

export default class UserController{

    getLogin(req, res){
        res.render('login')
    }

    postLogin(req, res){
        const {email, password}= req.body;
        const user = UserModel.isValidUser(email, password);
        if(!user){
          return  res.render('err',errorMsg = 'user not found pls register');
        }
        req.session.userEmail = email;
        let jobs = JobsModel.getJobs();
        res.render("job_list", {jobs, userEmail: req.session.userEmail});
    }

    postRegister(req, res){
        const {name, email, password} = req.body;
        UserModel.add(name, email, password);
        res.render('login');
    }

    logout(req, res){
        // on logout. destroy the session
        req.session.destroy((err)=>{
           if(err){
            console.log(err);
           }else{
            res.render('login');
           } 
        })
        res.clearCookie('lastVisit');
    }
}