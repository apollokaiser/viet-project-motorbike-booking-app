function SettingSideBar() {
  return (
    <>
      <ul id="settings" className="nav-tabs col-xs-3">
        <h4>Site</h4>
        <li className="active">
          <a href="#description" data-toggle="tab">
            Description
          </a>
        </li>
        <li className="">
          <a href="#appearance" data-toggle="tab">
            Appearance
          </a>
        </li>
        <li className="">
          <a href="#frontpage" data-toggle="tab">
            Frontpage
          </a>
        </li>

        <br />

        <h4>General</h4>
        <li className="">
          <a href="#licenses" data-toggle="tab">
            Licenses
          </a>
        </li>
        <li className="">
          <a href="#default_book_settings" data-toggle="tab">
            Default Book Settings
          </a>
        </li>
        <li className="">
          <a href="#privacy" data-toggle="tab">
            Privacy
          </a>
        </li>

        <br />

        <h4>Publish options</h4>
        <li className="">
          <a href="#allowed_options" data-toggle="tab">
            Allowed publishing options
          </a>
        </li>
        <li className="">
          <a href="#default_settings" data-toggle="tab">
            Default settings
          </a>
        </li>
      </ul>
    </>
  );
}

export default SettingSideBar;
