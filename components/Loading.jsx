import React, {  } from 'react';
import { useSelector } from "react-redux";
import { FadeLoader } from 'react-spinners';

const Loading = () => {
  const { config } = useSelector(x => x)
  
  if (!config.loading) return null

  return (
    <>
      <section
        style={{
          position: 'fixed',
          top: "50%",       
          left: '50%',
          transform: 'translate(-50%, -50%',
          padding: '30px',
          borderRadius: '30px',
          backgroundColor: 'rgba(255,255,255,0.8)',
          zIndex: 1000,
          alignItems: 'center',
          boxShadow: '0 0 4px 0 rgba(0,0,0,0.4)'
        }}
      >
        <FadeLoader
          color={'#1e97ff'}
          size={30}
        />
        <div className="spacer" />
        <h3>{config.loading}...</h3>
        <small>Please keep this window open until the process is complete</small>
      </section>

      <div 
        className="shield" 
        style={{ 
          zIndex: 999,
          backgroundColor: 'transparent',
        }}
      />
    </>
  )
}

export default Loading