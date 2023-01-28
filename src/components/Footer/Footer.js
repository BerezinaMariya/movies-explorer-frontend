function Footer(props) {
  const { pathName } = props;

  return (
    <footer 
    className={`${
      pathName === "/" ||
      pathName === "/movies" ||
      pathName === "/saved-movies"
        ? "footer"
        : "footer_hidden"
    }`}
    >
      <p className="text__13-16-reg footer__text footer__text_about">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </p>
      <div className="footer__copyright">
        <p className="text__13-16-reg footer__text footer__text_copyright-year">
          &copy; 2023
        </p>
        <div className="footer__copyright-companies">
          <p className="text__13-16-reg footer__text footer__text_copyright-company">
            Яндекс.Практикум
          </p>
          <p className="text__13-16-reg footer__text footer__text_copyright-company">
            Github
          </p>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
