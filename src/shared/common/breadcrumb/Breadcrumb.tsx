import { ChevronRight } from 'lucide-react'
import "./BreadCrumb.scss"
import React from 'react'

interface propTypes {
    title: string,
    pageName: string
}
const Breadcrumb = ({ title, pageName }: propTypes) => {
    return <>
        <div className="breadcrumb">
            <div className="breadcrumb__left">
                <h1 className="breadcrumb__title">{title}</h1>
                <div className="breadcrumb__paths">
                    <a href="#">Dashboard</a>
                    <ChevronRight size={13} />
                    <span>{pageName}</span>
                </div>
            </div>
            <div className="breadcrumb__right">

            </div>
        </div>

    </>
}

export default Breadcrumb