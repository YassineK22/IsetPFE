import React, { useEffect, useState } from 'react';
import { Sidebar } from 'flowbite-react';
import {
    HiUser,
    HiArrowSmRight,
    HiOutlineUserGroup,
    HiAnnotation,
    HiChartPie,
} from 'react-icons/hi';
import { GrValidate } from "react-icons/gr";
import { FaUsers } from "react-icons/fa";
import { MdOutlineWorkHistory } from "react-icons/md";
import { RiPresentationLine } from "react-icons/ri";
import { LuCalendarClock } from "react-icons/lu";
import { MdAddBox } from "react-icons/md";
import { signoutSuccess } from '../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { FaFileUpload } from "react-icons/fa";
const DashSidebar = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const [tab, setTab] = useState('');
    const { currentUser } = useSelector((state) => state.user);

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const tabFromUrl = urlParams.get('tab');
        if (tabFromUrl) {
            setTab(tabFromUrl);
        }
    }, [location.search]);

    const handleSignout = async () => {
        try {
            const res = await fetch('http://localhost:8000/signout', {
                method: 'POST',
            });
            const data = await res.json();
            if (!res.ok) {
                console.log(data.message);
            } else {
                dispatch(signoutSuccess());
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <Sidebar className='w-full md:w-59'>
            <Sidebar.Items>
                <Sidebar.ItemGroup className='flex flex-col gap-1'>
                    {currentUser.role === "responsable" && (
                        <Link to='/dashboard?tab=dash'>
                            <Sidebar.Item
                                active={tab === 'dash' || !tab}
                                icon={HiChartPie}
                                as='div'
                            >
                                Dashboard
                            </Sidebar.Item>
                        </Link>
                    )}
                    <Link to='/dashboard?tab=profile'>
                        <Sidebar.Item
                            active={tab === 'profile'}
                            icon={HiUser}
                            label={currentUser.role === "responsable" ? 'Responsable PFE' : currentUser.role === "enseignant" ? 'Enseignant' : 'Etudiant'}
                            labelColor='dark'
                            as='div'
                        >
                            Profile
                        </Sidebar.Item>
                    </Link>
                    {currentUser.role === "etudiant" && (
                        <>
                        <Link to='/dashboard?tab=RechercheStage'>
                            <Sidebar.Item
                                active={tab === 'RechercheStage'}
                                icon={MdOutlineWorkHistory}
                                labelColor='dark'
                                as='div'
                            >
                                Des Offres de Stage
                            </Sidebar.Item>
                        </Link>
                        <Link to='/dashboard?tab=Procedure du stage'>
                            <Sidebar.Item
                                active={tab === 'Procedure du stage'}
                                icon={FaFileUpload }
                                labelColor='dark'
                                as='div'
                            >
                                Procedure du stage
                            </Sidebar.Item>
                        </Link>
                        <Link to='/dashboard?tab=RechercheEncadreur'>
                            <Sidebar.Item
                                active={tab === 'RechercheEncadreur'}
                                icon={FaUsers}
                                labelColor='dark'
                                as='div'
                            >
                                Encadreurs
                            </Sidebar.Item>
                        </Link>
                        <Link to='/dashboard?tab=Soutenance'>
                            <Sidebar.Item
                                active={tab === 'Soutenance'}
                                icon={RiPresentationLine}
                                labelColor='dark'
                                as='div'
                            >
                                Soutenance
                            </Sidebar.Item>
                        </Link>
                        </>
                    )}
                    {currentUser.role === "responsable" && (
                        <>
                        <Link to='/dashboard?tab=OffresStages'>
                            <Sidebar.Item
                                active={tab === 'OffresStages'}
                                icon={MdAddBox}
                                as='div'
                            >
                                Offres des stage
                            </Sidebar.Item>
                        </Link>
                        <Link to='/dashboard?tab=Soutenance'>
                            <Sidebar.Item
                                active={tab ==='Soutenance'}
                                icon={ LuCalendarClock}
                                as='div'
                            >
                                Soutenances
                            </Sidebar.Item>
                        </Link>
                        <Link to='/dashboard?tab=Validation'>
                            <Sidebar.Item
                                active={tab === 'Validation'}
                                icon={GrValidate}
                                as='div'
                            >
                                Suivi et Validation
                            </Sidebar.Item>
                        </Link>
                        </>
                    )}
                    {currentUser.role === "enseignant" && (
                        <>
                            <Link to='/dashboard?tab=Mes PFE'>
                                <Sidebar.Item
                                    active={tab === 'Mes PFE'}
                                    icon={HiOutlineUserGroup}
                                    as='div'
                                >
                                    Mes PFE
                                </Sidebar.Item>
                            </Link>
                            <Link to='/dashboard?tab=Demandes'>
                                <Sidebar.Item
                                    active={tab === 'Demandes'}
                                    icon={HiAnnotation}
                                    as='div'
                                >
                                    Demandes
                                </Sidebar.Item>
                            </Link>
                            <Link to='/dashboard?tab=Soutenance'>
                                <Sidebar.Item
                                    active={tab === 'Soutenance'}
                                    icon={LuCalendarClock}
                                    as='div'
                                >
                                    Soutenance
                                </Sidebar.Item>
                            </Link>
                        </>
                    )}
                    <Sidebar.Item
                        icon={HiArrowSmRight}
                        className='cursor-pointer'
                        onClick={handleSignout}
                    >
                        Sign Out
                    </Sidebar.Item>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    );
};

export default DashSidebar;