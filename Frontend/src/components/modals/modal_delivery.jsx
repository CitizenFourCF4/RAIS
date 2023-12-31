import Modal from 'react-bootstrap/Modal';
import React from 'react'

function ModalDelivery(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <h4>Доставка и оплата</h4>
        <br />
        <p>Доставка по Москве</p>
        <ul>
          <li>
          При покупке от 15000 рублей - бесплатная доставка курьером по Москве
          </li>
          <li>
          Курьером по Москве (стоимость 350 рублей, срок доставки 1-3 дня, примерка)
          </li>
          <li>
          Курьером СДЭК по Москве, в пределах МКАД (стоимость 350 рублей, срок доставки 2-3 дня, примерка)
          </li>
          <li>
          Курьером до метро за МКАД (стоимость 350 рублей, срок доставки 1-3 дня, примерка)
          </li>
          <li>
          Курьером СДЭК за МКАД (стоимость 600 рублей, срок доставки ориентировочно 3-4 рабочих дня, примерка)
          </li>
        </ul>
        <br />
        <p>Доставка по России</p>
        <ul>
          <li>
          При покупке от 8000 рублей - бесплатная доставка Почтой России
          </li>
          <li>
          Почта России (стоимость – 400 рублей, ориентировочно 4-14 рабочих дней)
          </li>
          <li>
          Курьерская служба СДЭК (стоимость - 600 рублей, ориентировочно 2-5 рабочих дней)
          </li>
          <li>
          EMS Почта России (стоимость – 1250 рублей, ориентировочно 2-7 рабочих дней)
          </li>
        </ul>
        <br />
        <p>Доставка в Беларусь и Казахстан</p>
        <ul>
          <li>
          СДЭК Беларусь (стоимость – 690 рублей, ориентировочно 2-5 рабочих дней)
          </li>
          <li>
          СДЭК Казахстан (стоимость – 1100 рублей, ориентировочно 11-17 рабочих дней)
          </li>
        </ul>
      </Modal.Body>
    </Modal>
  );
}

export default ModalDelivery