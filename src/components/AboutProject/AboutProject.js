function AboutProject() {
  return (
    <section className="about-project">
      <h2 className="titles__title_22-27-reg-underlined">О проекте</h2>
      <div className="about-project__info">
        <div className="about-project__stages">
          <h3 className="titles__title_20-24-reg about-project__title">
            Дипломный проект включал 5 этапов
          </h3>
          <p className="texts__text_14-20-reg about-project__text">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </div>
        <div className="about-project__stages">
          <h3 className="titles__title_20-24-reg about-project__title">
            На выполнение диплома ушло 5 недель
          </h3>
          <p className="texts__text_14-20-reg about-project__text">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </div>
        </div>
        <div className="about-project__deadline">
          <div className="about-project__deadline-rec about-project__deadline-rec_back">
            <p className="texts__text_14-17-reg about-project__deadline-text">1 неделя</p>
          </div>
          <span className="texts__text_14-17-reg about-project__deadline-under-text about-project__deadline-under-text_back">Back-end</span>
          <div className="about-project__deadline-rec about-project__deadline-rec_front">
            <p className="texts__text_14-17-reg about-project__deadline-text">4 недели</p>
          </div>
          <span className="texts__text_14-17-reg about-project__deadline-under-text about-project__deadline-under-text_front">Front-end</span>
        </div>
      </section>

  );
}

export default AboutProject;
