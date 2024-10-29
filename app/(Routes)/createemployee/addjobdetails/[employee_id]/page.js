'use client';
import { useState, useEffect } from "react";
import axios from "axios";
import Title from "@/app/layouts/Titlebar"; // Ensure this path is correct
import { useRouter } from "next/navigation";
import SideBar from "@/app/layouts/Sidebar";

export default function JobDetailsUpdater({params}) {
  const employee_id = params.employee_id;
  const [jobTitleId, setJobTitleId] = useState("");
  const [payGradeId, setPayGradeId] = useState("");
  const [supervisorId, setSupervisorId] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [branchId, setBranchId] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [jobTitles, setJobTitles] = useState([]);
  const [payGrades, setPayGrades] = useState([]);
  const [supervisors, setSupervisors] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [branches, setBranches] = useState([]);
  const router = useRouter();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          jobTitlesResponse,
          payGradesResponse,
          supervisorsResponse,
          departmentsResponse,
          branchesResponse,
        ] = await Promise.all([
          axios.get("http://localhost:5000/enum/job-titles",{ withCredentials: true }),
          axios.get("http://localhost:5000/enum/pay-grades",{ withCredentials: true }),
          axios.get("http://localhost:5000/enum/supervisors",{ withCredentials: true }),
          axios.get("http://localhost:5000/enum/departments",{ withCredentials: true }),
          axios.get("http://localhost:5000/enum/branches",{ withCredentials: true }),
        ]);

        setJobTitles(jobTitlesResponse.data);
        setPayGrades(payGradesResponse.data);
        setSupervisors(supervisorsResponse.data);
        setDepartments(departmentsResponse.data);
        setBranches(branchesResponse.data);

        setJobTitleId("");
        setPayGradeId("");
        setSupervisorId("");
        setDepartmentId("");
        setBranchId("");
      } catch (err) {
        setError(err.response?.data?.message || "Network or server issue");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedDetails = {
      employeeId: employee_id,
      jobTitleId,
      payGradeId,
      supervisorId,
      departmentId,
      branchId,
    };

    try {
      const response = await axios.put(
        "http://localhost:5000/updateJobDetails",
        updatedDetails,{ withCredentials: true }
      );
      console.log("Job details updated successfully:", response.data);
      router.push(`/createemployee/adduserdetails/${employee_id}`);
    } catch (error) {
      console.error("Error updating job details:", error.response?.data || error.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
     <SideBar/>
     <div className="ml-56">
      <div className="m-1 bg-white rounded-lg shadow-md">
      {/* Title Bar */}
      <Title title="Update Job Details" />

      <div className="grid grid-cols-3 gap-4 p-5">
        {/* Left Side - Image */}
        <div className="col-span-1 flex justify-center items-center h-full">
          <img src="Job_Details.png" className="max-w-full max-h-full" alt="Logo" />
        </div>

        {/* Right Side - Form */}
        <div className="col-span-2">
          <form onSubmit={handleSubmit} className="p-5 w-full">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 text-center">Add Job Details</h2>
                <label className="block text-sm font-medium text-gray-700">Job Title</label>
                <select
                  name="jobTitleId"
                  value={jobTitleId}
                  onChange={(e) => setJobTitleId(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                >
                  <option value="" disabled>Select Job Title</option>
                  {jobTitles.map((jobTitle) => (
                    <option key={jobTitle.job_title_id} value={jobTitle.job_title_id}>
                      {jobTitle.job_title_name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Pay Grade</label>
                <select
                  name="payGradeId"
                  value={payGradeId}
                  onChange={(e) => setPayGradeId(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                >
                  <option value="" disabled>Select Pay Grade</option>
                  {payGrades.map((payGrade) => (
                    <option key={payGrade.pay_grade_id} value={payGrade.pay_grade_id}>
                      {payGrade.grade}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Supervisor</label>
                <select
                  name="supervisorId"
                  value={supervisorId}
                  onChange={(e) => setSupervisorId(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                >
                  <option value="" disabled>Select Supervisor</option>
                  {supervisors.map((supervisor) => (
                    <option key={supervisor.employee_id} value={supervisor.employee_id}>
                      {supervisor.username}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Department</label>
                <select
                  name="departmentId"
                  value={departmentId}
                  onChange={(e) => setDepartmentId(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                >
                  <option value="" disabled>Select Department</option>
                  {departments.map((department) => (
                    <option key={department.department_id} value={department.department_id}>
                      {department.department_name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Branch</label>
                <select
                  name="branchId"
                  value={branchId}
                  onChange={(e) => setBranchId(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                >
                  <option value="" disabled>Select Branch</option>
                  {branches.map((branch) => (
                    <option key={branch.branch_id} value={branch.branch_id}>
                      {branch.branch_name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button
                type="submit"
                className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-700"
              >
                Add Job Details
              </button>
            </div>
          </form>
        </div>
      </div>
     </div>
    </div>
    </>
  );
}