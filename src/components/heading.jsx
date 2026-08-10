// named export
// export function Heading(){
//   return <h1>HEADINGG</h1>
// }

// function Heading(props){
//   console.log(props);
//   return <h1>HEADINGG {props.title} {props.description}</h1>
// }

const headingStyle = {
  color: 'red',
  fontSize: '30px',
}

function Heading({ title, description, onShowAlert }) {
  return (
    <>
      <h1 style={headingStyle} className="text-blue-500">HEADINGG {title} {description}</h1>
      {onShowAlert &&
        <button className='counter' onClick={onShowAlert}>clcik me</button> 
      }
    </>
  )
}

// write with arrow function
// const Heading = () => {
// 	return <h1>HEADINGG</h1>
// }

export default Heading