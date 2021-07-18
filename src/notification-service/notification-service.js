import React from 'react';
import './notify.css';
/**
 *asdqwdasd
 * @param {int} props
 * @return {int}
 */
const Notify = (props) => {
  const {status} = props;
  console.log(status);
  return (
    <div
      className={`${status.number === 201 || status.number === 200 ?
        'notify' : ''}`}>
    </div>
  );
};


export default Notify;
