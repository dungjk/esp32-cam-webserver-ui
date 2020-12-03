const actions = () => ({
  toggleSetting(state, show: boolean) {
    return {
      settingShow: !!show,
    };
  },
});

export default actions;
