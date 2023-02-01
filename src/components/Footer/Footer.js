function Footer() {
  const pathName = window.location.pathname;

  return (
    <footer
      className={`footer ${
        pathName === "/" ||
        pathName === "/movies" ||
        pathName === "/saved-movies"
          ? ""
          : "footer_hidden"
      }`}
    >
      <p className="footer__text footer__text_about">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </p>
      <div className="footer__copyright">
        <p className="footer__text footer__text_year">&copy; 2023</p>
        <div className="footer__companies">
          <p className="footer__text footer__text_company">Яндекс.Практикум</p>
          <p className="footer__text footer__text_company">Github</p>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
