'use client';
import classNames from "classnames";
import { ClipboardMinus, Clock, LayoutDashboard, Leaf, Settings, User2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import User from "../models/userModel";

const SideBar = ({ activePanel }) => {
    const router = useRouter();

    /*  0: Dashboard
        1: Employee Management
        2: Attendance
        3: Leave
        4: Reports
        5: Settings
    */

    const [role, setRole] = useState('');
    const [employee_id, setEmployeeId] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const tempRole = await User.getRole();
                const tempEmployeeId = await User.getEmployeeId();
                setRole(tempRole);
                setEmployeeId(tempEmployeeId);
            } catch (err) {
                console.error(err);
            }
        };
        fetchUserData();
    }, []);

    const changePanel = (panel) => {
        if (panel === 0) router.push('/dashboard');
        else if (panel === 1) router.push('/createemployee');
        else if (panel === 2) router.push('/profile/' + employee_id);
        else if (panel === 3) router.push('/manage');
        else if (panel === 4) router.push('/leave');
        else if (panel === 5) router.push('/reports');
        else if (panel === 6) router.push('/settings');
    }

    return (
        <div className="flex-col h-screen fixed left-0 bg-black w-56 items-center gap-4 rounded-r-xl hidden lg:flex">
            <img src="logo.png" className="w-full p-5 pt-5" alt="Logo" />
            
            {/* Dashboard */}
            <div className={classNames("w-11/12 hover:bg-rose-400 h-10 ml-auto rounded-l-lg transition-all", { 'bg-black': !(activePanel === 0), 'bg-rose-700': (activePanel === 0) })}>
                <button onClick={() => changePanel(0)} className="w-full h-full text-gray-500 hover:text-white font-serif text-sm text-left ml-4 flex items-center">
                    <LayoutDashboard className="mr-1" />
                    Dashboard
                </button>
            </div>

            {/* Employee Management (Admin and HR Manager Only) */}
            {(role === "Admin" || role === "HR Manager") && (
                <div onClick={() => changePanel(1)} className={classNames("w-11/12 hover:bg-rose-400 h-10 ml-auto rounded-l-lg transition-all", { 'bg-black': !(activePanel === 1), 'bg-rose-700': (activePanel === 1) })}>
                    <button className="w-full h-full text-gray-500 hover:text-white font-serif text-sm text-left ml-4 flex items-center">
                        <User2Icon className="mr-1" />
                        Create Employee
                    </button>
                </div>
            )}
             {(role === "Admin" || role === "Supervisor" || role === "HR Manager") && (
            <div onClick={() => changePanel(2)} className={classNames("w-11/12 hover:bg-rose-400 h-10 ml-auto rounded-l-lg transition-all", { 'bg-black': !(activePanel === 2), 'bg-rose-700': (activePanel === 2) })}>
                <button className="w-full h-full text-gray-500 hover:text-white font-serif text-sm text-left ml-4 flex items-center">
                    <Clock className="mr-1" />
                    Profile
                </button>
            </div>
            )}
            
            <div onClick={() => changePanel(3)} className={classNames("w-11/12 hover:bg-rose-400 h-10 ml-auto rounded-l-lg transition-all", { 'bg-black': !(activePanel === 3), 'bg-rose-700': (activePanel === 3) })}>
                <button className="w-full h-full text-gray-500 hover:text-white font-serif text-sm text-left ml-4 flex items-center">
                    <Clock className="mr-1" />
                    Manage Employee
                </button>
            </div>
            {/* Leave Management (Admin, Supervisor, HR Manager Only) */}
            {(role === "Admin" || role === "Supervisor" || role === "HR Manager") && (
                <div onClick={() => changePanel(4)} className={classNames("w-11/12 hover:bg-rose-400 h-10 ml-auto rounded-l-lg transition-all", { 'bg-black': !(activePanel === 4), 'bg-rose-700': (activePanel === 4) })}>
                    <button className="w-full h-full text-gray-500 hover:text-white font-serif text-sm text-left ml-4 flex items-center">
                        <Leaf className="mr-1" />
                        Leave Management
                    </button>
                </div>
            )}

            {/* Reports (Admin, Supervisor, HR Manager Only) */}
            {(role === "Admin" || role === "Supervisor" || role === "HR Manager") && (
                <div onClick={() => changePanel(5)} className={classNames("w-11/12 hover:bg-rose-400 h-10 ml-auto rounded-l-lg transition-all", { 'bg-black': !(activePanel === 5), 'bg-rose-700': (activePanel === 5) })}>
                    <button className="w-full h-full text-gray-500 hover:text-white font-serif text-sm text-left ml-4 flex items-center">
                        <ClipboardMinus className="mr-1" />
                        Reports
                    </button>
                </div>
            )}

        </div>
    );
}

export default SideBar;
