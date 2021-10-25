import React from 'react';
import { ReactComponent as MainImage } from '../../assets/main-image.svg';
import Button from '../Buttons/Button/Button';

const Launch = (): JSX.Element => {
  return (
    <section>
      <MainImage className="svg" />
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
        />
        <Button
          typeOption="link"
          styleOption="button"
          text="Sign Up"
          to="/auth/signup"
        />
      </div>
    </section>
  );
};

export default Launch;
