import { Component, MouseEvent, SyntheticEvent } from 'react'
import { Button, Typography, IconButton, Toolbar, AppBar, FormControl, NativeSelect } from '@material-ui/core'
import { fade, WithStyles, withStyles, createStyles, Theme } from '@material-ui/core/styles'
import { DropzoneDialog } from 'material-ui-dropzone'

const styles = (theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    uploadFileStyle: {
      marginLeft: theme.spacing(4)
    },
    exportFileType: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 1.0),
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto'
      }
    },
    sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex'
      }
    }
  })

interface FileMenuState {
  fileFormat: string
  uploadModalOpen: boolean
}

interface FileMenuProps extends WithStyles<typeof styles> {
  onUploadFile: (files: File[]) => void,
  onExport: (fileFormat: string) => void
}

class FileMenuComponent extends Component<FileMenuProps, FileMenuState> {
  constructor(props: FileMenuProps) {
    super(props)
    this.state = {
      fileFormat: 'gltf',
      uploadModalOpen: false
    }

    this.handlnUploadFile = this.handlnUploadFile.bind(this)
    this.handleUploadDialog = this.handleUploadDialog.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleExport = this.handleExport.bind(this)
  }

  handlnUploadFile(files: File[], event: SyntheticEvent<Element, Event>) {
    this.props.onUploadFile(files)
    this.setState({
      uploadModalOpen: !this.state.uploadModalOpen
    })
  }

  handleUploadDialog(event: SyntheticEvent<Element, Event>) {
    this.setState({
      uploadModalOpen: !this.state.uploadModalOpen
    })
  }

  handleChange(event: SyntheticEvent) {
    const changedValue = event.target.value
    this.setState({
      fileFormat: changedValue
    })
  }

  handleExport(event: SyntheticEvent) {
    const exportFileFormat = this.state.fileFormat;
    this.props.onExport(exportFileFormat);
  }

  render() {
    const { classes } = this.props
    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <div className={classes.uploadFileStyle}>
              <Button variant="contained" color="secondary" onClick={this.handleUploadDialog}>
                FileUpload
              </Button>
            </div>
            <div className={classes.exportFileType}>
              <FormControl>
                <NativeSelect
                  value={this.state.fileFormat}
                  onChange={this.handleChange}
                  inputProps={{
                    name: 'file-format',
                    id: 'file-format-native-label-placeholder'
                  }}
                >
                  <option value="gltf">GLTF</option>
                  <option value="glb">GLB</option>
                </NativeSelect>
              </FormControl>
            </div>
            <div className={classes.sectionDesktop}>
              <Button variant="contained" color="secondary" onClick={this.handleExport}>
                Export
              </Button>
            </div>
          </Toolbar>
        </AppBar>
        <DropzoneDialog
          open={this.state.uploadModalOpen}
          onSave={this.handlnUploadFile}
          showPreviews={true}
          filesLimit={1}
          maxFileSize={10000000000}
          onClose={this.handleUploadDialog}
        />
      </div>
    )
  }
}

export const FileMenu = withStyles(styles)(FileMenuComponent)
