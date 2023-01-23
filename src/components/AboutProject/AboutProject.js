function AboutProject() {
  return (
    <section id="about-project" className="about-project">
      <h2 className="title__22-27-reg">О проекте</h2>
      <div className="about-project__info">
        <div className="steps-info">
          <h3 className="steps-info__title">
            Дипломный проект включал 5 этапов
          </h3>
          <p className="text__14-20-reg steps-info__text">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </div>
        <div className="steps-info">
          <h3 className="steps-info__title">
            На выполнение диплома ушло 5 недель
          </h3>
          <p className="text__14-20-reg steps-info__text">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </div>
        </div>
        <div className="deadline">
          <div className="deadline__rec deadline__rec_back">
            <p className="text__14-17-reg deadline__text">1 неделя</p>
          </div>
          <span className="text__14-17-reg deadline__under-text deadline__under-text_back">Back-end</span>
          <div className="deadline__rec deadline__rec_front">
            <p className="text__14-17-reg deadline__text">4 недели</p>
          </div>
          <span className="text__14-17-reg deadline__under-text deadline__under-text_front">Front-end</span>
        </div>
      </section>

  );
}

export default AboutProject;
