function TextArea({name, label, onChange, value}) {
  return (
    <>
      <div>
        <label className="uk-form-label" htmlFor={name}>
          {label}
        </label>
        <div className="form-controls">
          <textarea className="textarea" name={name} id={name} value={value} onChange={onChange}/>
        </div>
      </div>
    </>
  );
}

export default TextArea;
