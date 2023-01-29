function AboutProject() {
  return (
    <section id="about-project" className="about-project">
      <h2 className="about-project__title about-project__title_page-up">О проекте</h2>
      <div className="about-project__info">
        <div className="about-project__stages">
          <h3 className="about-project__title about-project__title_info">
            Дипломный проект включал 5 этапов
          </h3>
          <p className="about-project__text">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </div>
        <div className="about-project__stages">
          <h3 className="about-project__title about-project__title_info">
            На выполнение диплома ушло 5 недель
          </h3>
          <p className="about-project__text">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </div>
        </div>
        <div className="about-project__deadline">
          <div className="about-project__deadline-rec about-project__deadline-rec_back">
            <p className="about-project__deadline-text">1 неделя</p>
          </div>
          <span className="about-project__deadline-text about-project__deadline-text_under about-project__deadline-text_under_back">Back-end</span>
          <div className="about-project__deadline-rec about-project__deadline-rec_front">
            <p className="about-project__deadline-text">4 недели</p>
          </div>
          <span className="about-project__deadline-text about-project__deadline-text_under about-project__deadline-text_under_front">Front-end</span>
        </div>
      </section>

  );
}

export default AboutProject;
