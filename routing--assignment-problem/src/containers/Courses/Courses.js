import React, { Component } from 'react';
import { Route } from 'react-router-dom'

import Course from '../Course/Course'
import './Courses.css';

class Courses extends Component {
    state = {
        courses: [
            { id: 1, title: 'Angular - The Complete Guide' },
            { id: 2, title: 'Vue - The Complete Guide' },
            { id: 3, title: 'PWA - The Complete Guide' }
        ]
    }

    selectCourseHandler = (id, title) => {
        this.props.history.push({
            pathname: `${this.props.match.url}/${id}`,
            search: "?" + new URLSearchParams({'title': title}).toString()
        })
    }

    render () {
        return (
            <div>
                <h1>Amazing Udemy Courses</h1>
                <section className="Courses">
                    {
                        this.state.courses.map( course => {
                            return (
                                <article className="Course" key={course.id} onClick={() => this.selectCourseHandler(course.id, course.title)}>
                                    {/*<Link to={`${this.props.match.url}/${course.id}`} >{course.title}</Link>*/}
                                    {course.title}
                                </article>
                            )
                        } )
                    }
                </section>
                <Route path={`${this.props.match.url}/:id`} exact component={Course} />
            </div>
        );
    }
}

export default Courses;