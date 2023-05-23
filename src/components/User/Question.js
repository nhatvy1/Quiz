import _ from 'lodash';

const Question = (props)=> {
    const { data, index } = props
    if (_.isEmpty(data)) {
        return (<></>)
    }
    return (
        <>
            {
                data.image && 
                <div className="q-image">
                    <img src={`data:image/jpeg;base64, ${data.image}`} alt='loi'/>
                </div>
            }
            <div className="question">Question {index+1}: {data.questionDescription}</div>
            <div className="answers">
                {
                    data.answers && data.answers.length &&
                    data.answers.map((item, index)=>{
                        return (
                            <div key={index}>
                                <div class="form-check">
                                    <input className="form-check-input" type="checkbox" value=""/>
                                    <label className="form-check-label" >
                                        {item.description}
                                    </label>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}

export default Question