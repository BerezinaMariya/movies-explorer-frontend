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
      <p className="texts__text_13-16-reg footer__text footer__text_about">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </p>
      <div className="footer__copyright">
        <p className="texts__text_13-16-reg footer__text footer__text_copyright-year">
          &copy; 2023
        </p>
        <div className="footer__copyright-companies">
          <p className="texts__text_13-16-reg footer__text footer__text_copyright-company">
            Яндекс.Практикум
          </p>
          <p className="texts__text_13-16-reg footer__text footer__text_copyright-company">
            Github
          </p>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
