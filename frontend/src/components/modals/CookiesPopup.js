/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import {
  Layout, CustomModalLayout, Text, Modal,
} from 'wix-style-react';

const CookiesPopup = ({ isModalOpened, onAccept, onClose }) => {
  return (
    <Layout cols={1}>
      <Modal
        isOpen={isModalOpened}
        shouldCloseOnOverlayClick={false}
        shouldDisplayCloseButton={false}
      >
        <CustomModalLayout
          primaryButtonText="Yes, I accept Cookies"
          primaryButtonOnClick={onAccept}
          onCloseButtonClick={onClose}
          title="This website use Cookies"
          footnote={(
            <Text size="small">
              By accepting cookies, you agree to the
              {' '}
              <a>Epicenter Terms of Use</a>
            </Text>
        )}
        >
          <Text>
            Please accept cookies to continue
          </Text>
        </CustomModalLayout>
      </Modal>
    </Layout>
  );
};
export default CookiesPopup;
