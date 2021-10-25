import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as MainImage } from '../../assets/main-image.svg';
import Button from '../Buttons/Button/Button';

const Launch = () => {
  return (
    <section>
      <MainImage className="svg"></MainImage>
      <div>
        <h2>Do It All With Todo Flow</h2>
        <p>A simple Todo Application to help you with your everyday tasks.</p>
      </div>
      <div className="button-group">
        <Button
          typeOption="link"
          styleOption="button"
          text="Log In"
          to="/auth/signin"
        ></Button>
        <Button
          typeOption="link"
          styleOption="button"
          text="Sign Up"
          to="/auth/signup"
        ></Button>
      </div>
    </section>
  );
};

export default Launch;
