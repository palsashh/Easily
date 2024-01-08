import { jobs } from "../assets/jobs.js";
export default class JobsModel {

    static getJobs() {
        return jobs;
    }

    static newJob(jobDetails) {
        jobs.push(jobDetails);
    }

    static jobById(id) {
        return jobs.find(p => p.id == id)
    }

    static update(jobDetails) {
        const index = jobs.findIndex((p) => p.id == jobDetails.id);
        jobs[index] = jobDetails;
        
    }
    static delete(id) {
        const index = jobs.findIndex((p) => p.id == id);
        jobs.splice(index, 1)
    }
    static addApplicant(id, name, email, contact, resume) {
        const index = jobs.findIndex((p) => p.id == id);
        let applicantId = jobs[index].applicants.length+1;
        jobs[index].applicants.push(
            {
                applicantId: applicantId,
                name: name,
                email: email,
                contact: contact,
                resumePath: resume,
            }
        );
    }
    static getApplicants(id) {
        const index = jobs.findIndex((p) => p.id == id);
        return jobs[index].applicants;
    }
    static getApplicantDetailbyApplicantId(applicantId) {
        return jobs.applicants.find(p => p.applicantId == applicantId);
    }
    static updateApplicantDetailByApplicantId(applicantDetail) {
        const index = jobs.applicants.findIndex((p) => p.applicantId == applicantDetail.applicantId);
        jobs.applicants[index] = applicantDetail;
    }
    static deleteApplicantByApplicantId(applicantId) {
        const index = jobs.applicants.findIndex((p) => p.applicantId == applicantId);
        jobs.applicants.splice(index, 1);
    }
    static searchResult(name){
        const data = jobs.filter((job) => {
          if (job.companyName == name) {
            return job;
          }
        });
        return data;
      }
}

