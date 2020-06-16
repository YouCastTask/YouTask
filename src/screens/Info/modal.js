import React, { PureComponent } from 'react';
import { Modal } from 'react-native';
import { PackageSlider } from './../../components';

type Props = {
    visible: Boolean,
    closeBtnPress: Function,
    packages: [{
        title: String,
        cost: String,
        period: String,
        firstCaption: String,
        orangeText: String,
        secondCaption: String,
        footerTitle: String,
        options: [String]
    }],
    submitAction: Function,
    page: Number,
    loading: Boolean
}

class ExModal extends PureComponent<Props> {

    render() {
        const { visible, packages, closeBtnPress, page, submitAction, loading } = this.props;

        return (
            <Modal visible={visible} animated animationType="fade" transparent supportedOrientations={["portrait"]}>
                <PackageSlider
                    hidePagination
                    packages={packages}
                    tabsHeight={'100%'}
                    closeBtnPress={closeBtnPress}
                    page={page}
                    submitAction={submitAction}
                    loading={loading}
                />
            </Modal>
        );
    }
}

export default ExModal;