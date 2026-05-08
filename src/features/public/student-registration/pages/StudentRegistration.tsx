import React from 'react'
import "./StudentRegistration.scss"
import { BriefcaseBusiness, Contact, GraduationCap, List, Mail, MapPin, PersonStanding, Phone, School, Send, User, UserRound, Users } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { studentSchema, type StudentRegistrationFormType } from '../schemas/student-registration.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import PublicHeader from '../../../../shared/layouts/public-header/PublicHeader'
import FormSelectInput from '../../../../shared/ui/forms/FormSelectInput/FormSelectInput'
import FormDateInput from '../../../../shared/ui/forms/FormSelectInput/FormDateInput'


const StudentRegistration = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<StudentRegistrationFormType>({
        resolver: zodResolver(studentSchema),
        mode: "onChange",
    });

    return <>
        <PublicHeader/>
        <section className="stu-reg">
            <main className="stu-reg__container">
                <div className="stu-reg__reg-banner">
            <div className="stu-reg__banner-content">
                <div className="stu-reg__school-logo"></div>
                <div className="stu-reg__school-info">
                    <div className="stu-reg__school-name">Swaraj Bal Niketan High School</div>
                    <div className="stu-reg__school-tagline">Learn . Grow . Success</div>
                </div>
            </div>
        </div>
                <div className="stu-reg__header">
                    <div className="stu-reg__title">Student Registration</div>
                    <div className="stu-reg__sub-title">Fill in the details below to register</div>
                </div>
                <form className="stu-reg__form">
                    {/* start box */}
                    <div className="stu-reg__form-box">
                        <div className="stu-reg__groups-category">
                            <div className="stu-reg__category-block personal"><User className='icon personal' /></div>
                            <div className="stu-reg__category-name">Personal Information</div>
                        </div>
                        <div className="stu-reg__input-groups">
                            <div className="stu-reg__input-group">
                                <div className="stu-reg__input-label">Studen First Name <span>*</span></div>
                                <div className="stu-reg__input-wrapper">
                                    <div className="stu-reg__input-icon"><UserRound className='icon' /></div>
                                    <input type="text" className="stu-reg__input" placeholder='Enter first name' />
                                </div>
                            </div>
                            <div className="stu-reg__input-group">
                                <div className="stu-reg__input-label">Studen First Name <span>*</span></div>
                                <div className="stu-reg__input-wrapper">
                                    <div className="stu-reg__input-icon"><UserRound className='icon' /></div>
                                    <input type="text" className="stu-reg__input" placeholder='Enter first name' />
                                </div>
                            </div>
                            <div className="stu-reg__input-group">
                                <div className="stu-reg__input-label">Gender <span>*</span></div>
                                <FormSelectInput
                                    name="gender"
                                    options={[
                                        { label: "Male", value: "male" },
                                        { label: "Female", value: "female" },
                                    ]}
                                    register={register}
                                    error={errors.gender}
                                    placeholder="Select Gender"
                                />
                            </div>
                            <div className="stu-reg__input-group">
                                <div className="stu-reg__input-label">Birth Date <span>*</span></div>
                                <FormDateInput
                                    name="dob"
                                    register={register}
                                    error={errors.dob}
                                    required
                                />
                            </div>
                            <div className="stu-reg__input-group">
                                <div className="stu-reg__input-label">Select Blood group <span>*</span></div>
                                <FormSelectInput
                                    name="bloodgroup"
                                    options={[
                                        { label: "A", value: "A" },
                                        { label: "B", value: "B" },
                                    ]}
                                    register={register}
                                    error={errors.gender}
                                    placeholder="Select blood group"
                                />
                            </div>
                            <div className="stu-reg__input-group">
                                <div className="stu-reg__input-label">Nationality <span>*</span></div>
                                <FormSelectInput
                                    name="nationality"
                                    options={[
                                        { label: "india", value: "india" },
                                    ]}
                                    register={register}
                                    error={errors.gender}
                                    placeholder="Select nationality"
                                />
                            </div>
                        </div>
                    </div>
                    {/* End of box */}


                    {/* start box */}
                    <div className="stu-reg__form-box">
                        <div className="stu-reg__groups-category ">
                            <div className="stu-reg__category-block contact"><Phone className='icon contact' /></div>
                            <div className="stu-reg__category-name">Contact Information</div>
                        </div>
                        <div className="stu-reg__input-groups">
                            <div className="stu-reg__input-group">
                                <div className="stu-reg__input-label">Mobile Number<span>*</span></div>
                                <div className="stu-reg__input-wrapper">
                                    <div className="stu-reg__input-icon"><Phone className='icon' /></div>
                                    <input type="mobile" className="stu-reg__input" placeholder='Enter mobile number' />
                                </div>
                            </div>
                            <div className="stu-reg__input-group">
                                <div className="stu-reg__input-label">Email Addrss <span>*</span></div>
                                <div className="stu-reg__input-wrapper">
                                    <div className="stu-reg__input-icon"><Mail className='icon' /></div>
                                    <input type="text" className="stu-reg__input" placeholder='Enter email address' />
                                </div>
                            </div>
                            <div className="stu-reg__input-group">
                                <div className="stu-reg__input-label">Alternate Mobile Number<span>*</span></div>
                                <div className="stu-reg__input-wrapper">
                                    <div className="stu-reg__input-icon"><Phone className='icon' /></div>
                                    <input type="mobile" className="stu-reg__input" placeholder='Enter alternate  number' />
                                </div>
                            </div>
                            <div className="stu-reg__input-group stu-reg__input-group--full">
                                <div className="stu-reg__input-label">Address<span>*</span></div>
                                <div className="stu-reg__input-wrapper">
                                    <div className="stu-reg__input-icon"><MapPin className='icon' /></div>
                                    <input type="mobile" className="stu-reg__input" placeholder='Enter complete address ' />
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* End of box */}

                    {/* start box */}
                    <div className="stu-reg__form-box">
                        <div className="stu-reg__groups-category ">
                            <div className="stu-reg__category-block academic"><GraduationCap className='icon academic' /></div>
                            <div className="stu-reg__category-name">Academic  Information</div>
                        </div>
                        <div className="stu-reg__input-groups">
                            <div className="stu-reg__input-group">
                                <div className="stu-reg__input-label">Class Applying For<span>*</span></div>
                                <FormSelectInput
                                    name="class"
                                    options={[
                                        { label: "A", value: "A" },
                                        { label: "B", value: "B" },
                                    ]}
                                    register={register}
                                    error={errors.gender}
                                    placeholder="Select class"
                                />
                            </div>
                            <div className="stu-reg__input-group">
                                <div className="stu-reg__input-label">Previous school name <span>*</span></div>
                                <div className="stu-reg__input-wrapper">
                                    <div className="stu-reg__input-icon"><School className='icon' /></div>
                                    <input type="text" className="stu-reg__input" placeholder='Enter previous school' />
                                </div>
                            </div>
                            <div className="stu-reg__input-group">
                                <div className="stu-reg__input-label">Academic year<span>*</span></div>
                                <FormSelectInput
                                    name="list"
                                    options={[
                                        { label: "A", value: "A" },
                                        { label: "B", value: "B" },
                                    ]}
                                    register={register}
                                    error={errors.gender}
                                    placeholder="Select academic year"
                                />
                            </div>

                        </div>
                    </div>
                    {/* End of box */}

                    {/* start box */}
                    <div className="stu-reg__form-box">
                        <div className="stu-reg__groups-category ">
                            <div className="stu-reg__category-block gradian"><Users className='icon gradian' /></div>
                            <div className="stu-reg__category-name">Gradian  Information</div>
                        </div>
                        <div className="stu-reg__input-groups">
                            <div className="stu-reg__input-group">
                                <div className="stu-reg__input-label">Gradian name <span>*</span></div>
                                <div className="stu-reg__input-wrapper">
                                    <div className="stu-reg__input-icon"><User className='icon' /></div>
                                    <input type="text" className="stu-reg__input" placeholder='Enter gradian name' />
                                </div>
                            </div>
                            <div className="stu-reg__input-group">
                                <div className="stu-reg__input-label">Relationship<span>*</span></div>
                                <FormSelectInput
                                    name="users"
                                    options={[
                                        { label: "A", value: "A" },
                                        { label: "B", value: "B" },
                                    ]}
                                    register={register}
                                    error={errors.gender}
                                    placeholder="Select relationship"
                                />
                            </div>
                            <div className="stu-reg__input-group">
                                <div className="stu-reg__input-label">Gradian Mobile Number<span>*</span></div>
                                <div className="stu-reg__input-wrapper">
                                    <div className="stu-reg__input-icon"><Phone className='icon' /></div>
                                    <input type="mobile" className="stu-reg__input" placeholder='Enter gradian  number' />
                                </div>
                            </div>
                             <div className="stu-reg__input-group">
                                <div className="stu-reg__input-label">Gradian Email Addrss <span>*</span></div>
                                <div className="stu-reg__input-wrapper">
                                    <div className="stu-reg__input-icon"><Mail className='icon' /></div>
                                    <input type="text" className="stu-reg__input" placeholder='Enter email address' />
                                </div>
                            </div>
                            <div className="stu-reg__input-group">
                                <div className="stu-reg__input-label">Occupation<span>*</span></div>
                                <div className="stu-reg__input-wrapper">
                                    <div className="stu-reg__input-icon"><BriefcaseBusiness className='icon' /></div>
                                    <input type="text" className="stu-reg__input" placeholder='Enter occupation' />
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* End of box */}

                    <div className="stu-reg__footer">
                        <div className="stu-reg__hereby-group">
                            <div className="stu-reg__heereby-checkbox"></div>
                            <div className="stu-reg__hereby-message">I hereby declare that the information provided above is true and correct to the best of my knowledge.</div>
                        </div>
                        <div className="stu-reg__form-actions">
                            <button className="stu-reg__submit-registration"><Send className='icon'/>Submit Registration</button>
                        </div>
                        <div className="stu-reg__already-account">Already have an account? <span> Login here</span></div>
                    </div>

                </form>
            </main>
        </section>


    </>
}

export default StudentRegistration