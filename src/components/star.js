import React, {useState} from 'react';   



function StarRating({count, value, 
    inactiveColor='#ddd',
    size=16,
    activeColor='rgb(255,215,0)', onChange}) {


  const stars = Array.from({length: count}, () => '🟊')

 
  const handleChange = (value) => {
    onChange(value + 1);
  }

  return (
    <div>
      {stars.map((s, index) => {
        let style = inactiveColor;
        if (index < value) {
          style=activeColor;
        }
        return (
          <span className={"star"}  
            key={index}
            style={{color: style, width:size, height:size, fontSize: size}}
            onClick={()=>handleChange(index)}>{s}</span>
        )
      })}

    </div>
  )
}


export default function StarRating0(props) {
  
  const [rating, setRating] = useState(props.val/2);

  const handleChange = (value) => {
    setRating(value);
    props.setRating(value);
  }
  return (
    <div>
     <StarRating 
       count={5}
       size={40}
       value={rating}
       activeColor ={'goldenrod'}
       inactiveColor={'#ddd'}
       onChange={handleChange}  />
    </div>
  )
}