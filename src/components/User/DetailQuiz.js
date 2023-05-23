import { useEffect } from "react"
import { useParams, useLocation } from "react-router-dom";
import { getDataQuiz } from "../../services/apiService";
import _ from 'lodash';
import './DetailQuiz.scss';
import Question from "./Question";
import { useState } from "react";

const DetailQuiz = (props)=> {
    const params = useParams()
    const location = useLocation()
    console.log(location)
    const quizId = params.id

    const [dataQuiz, setDataQuiz] = useState([])
    const [index, setIndex] = useState(0)

    useEffect(()=> {
        fetchQuestion()
    }, [quizId])
    
    const fetchQuestion = async ()=> {
        let res = await getDataQuiz(quizId)
        if (res && res.EC === 0) {
            let raw = res.DT
            let data = _.chain(raw)
                // Group the elements of Array based on `color` property
                .groupBy("id")
                // `key` is group's name (color), `value` is the array of objects
                .map((value, key)=> {
                    let answers = []
                    let questionDescription, image = null

                    value.forEach((item, index)=> {
                        if (index === 0) {
                            questionDescription = item.description
                            image = item.image 
                        }
                        answers.push(item.answers)
                    })
                    return { questionId: key, answers, questionDescription, image }
                })
                .value()
            console.log(data)
            setDataQuiz(data)
        }
    }

    const handlePrev = ()=> {
        if (index - 1 < 0) {
            return
        }
        setIndex(index-1)
    }

    const handleNext = ()=> {
        if (dataQuiz && dataQuiz.length > index + 1) {
            setIndex(index+1)
        }
    }

    return (
        <div className="detail-quiz-container container mt-5">
            <div className="left-content">
                <div className="">
                    <div className="title">
                        Quiz 1: {location?.state?.quizTitle}
                    </div>
                    <hr />
                    <div className="q-body">
                        <img />
                    </div>
                    <div className="q-content">
                        <Question 
                            data={dataQuiz && dataQuiz.length > 0 ?  dataQuiz[index]: []}
                            index={index}
                        />
                    </div>
                    <div className="footer">
                        <button className="btn btn-secondary mr-3" onClick={()=> handlePrev()}>Previous</button>
                        <button className="btn btn-primary" onClick={()=> handleNext()}>Next</button>
                    </div>
                </div>
            </div>
            <div className="right-content">
                count down
            </div>
        </div>
    )
}

export default DetailQuiz