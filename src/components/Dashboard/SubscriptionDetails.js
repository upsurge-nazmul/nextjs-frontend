import Modal from "../Modal";

export default function SubscriptionDetails({ setShowSubscription }) {
  return (
    <Modal
      title={"Subscription Details"}
      actions={{
        cancelText: "Close",
        isCancel: true,
        handleCancel: () => setShowSubscription(false),
      }}
    >
      This is subscription
    </Modal>
  );
}
