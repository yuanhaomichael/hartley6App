import React from 'react';

export default function WelcomeCard(){
  return(
    <div className='main-lg' style={styles.main}>
      <div style={styles.body}>
        <div style={{position: 'relative', textAlign: 'center'}}>
          <img src="../eventoLogo.png"  style={styles.img}/>
          <div style={{position: 'absolute', left: '42%', top: '80%'}}>
           Evento
          </div>         
        </div>
        <p style={{paddingLeft: 30}}>Dear User, </p>
        <p style={styles.paragraph}>
        Welcome to Evento, a more spontaneous way to engage with the world; 
        simply choose your interests & let us recommend campus events that truly matter to you. 
        Remember to save Evento to your home screen!
        </p>
        <p style={{paddingLeft: 30}}>Best, </p>
        <p style={{paddingLeft: 30}}>The Evento Team</p>
      </div>
    </div>
  )
}

const styles = { 
  main:{
    height: 'auto',
    backgroundColor: 'white',
    boxShadow: "0px 3px 15px rgba(0,0,0,0.2)",
    borderRadius: '15px', 
    margin: 'auto',
    width: '95vw',
    marginTop: 20,
    textAlign: 'left',
  },
  body:{
    top: '10%',
    position: 'relative',
    paddingBottom: 20,
  },
  img:{
    width: '40%',
    paddingBottom: 0,
  },
  paragraph: {
    paddingLeft: 30,
    paddingRight: 30,
  }
}