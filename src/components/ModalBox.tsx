import Button from "./Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Dropzone from "./MyAccount/Dropzone";

interface ModalBoxProps {
  modalState: "delete" | "upload";
  isShowing: boolean;
  setModalShowing: (modalShowing: boolean) => void;
  confirmHandle: () => void;
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ModalBox = ({
  isShowing,
  modalState,
  setModalShowing,
  confirmHandle,
}: ModalBoxProps) => {
  const handleClose = () => setModalShowing(false);

  return (
    <div>
      <Modal
        open={isShowing}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {modalState === "delete" ? (
            <>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Profile Deletion Confirmation
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                We are truly sorry to se you go. Before you proceed with
                deleting your profile, we want you to know that this action is
                permanent and irreversible. You´ll lose access to all your
                account information, course progress, certificates, and any
                learning communities you're a part of.
                <br />
                If there's anything we can do to improve your experience or if
                you need assistance with any issues you'va encountered, please
                reach out to our support team. We're always her to help.
                <br />
                If you still wish to delete your account, please click on the
                'Confirm' button below
              </Typography>
              <div className="flex justify-end mt-4 w-full">
                <article className=" w-[100px]">
                  <Button
                    name={"Cancel"}
                    onClick={handleClose}
                    state={"transparent"}
                  />
                </article>
                <article className=" w-[100px]">
                  <Button
                    onClick={confirmHandle}
                    name={"Confirm"}
                    state={"danger"}
                  />
                </article>
              </div>
            </>
          ) : (
            <>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Upload files
              </Typography>
              <Dropzone />
              <div className="flex justify-end mt-4 w-full">
                <article className=" w-[100px]">
                  <Button
                    name={"Cancel"}
                    onClick={handleClose}
                    state={"transparent"}
                  />
                </article>
                <article className=" w-[100px]">
                  <Button
                    name={"Upload"}
                    onClick={() => {
                      //This should save the image on the profile
                    }}
                    state={"primary"}
                  />
                </article>
              </div>
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default ModalBox;
