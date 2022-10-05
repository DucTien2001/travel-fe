/*eslint-disable*/
import { memo} from "react";
import {

  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import classes from "./styles.module.scss";

const CustomPagination = memo(() => {

  return (
    <>
        <Pagination>
            <PaginationItem>
                <PaginationLink
                    aria-label="Previous"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                >
                    <span aria-hidden={true}>
                    <FontAwesomeIcon icon={faChevronLeft}/>
                    </span>
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    1
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem className={classes.active}>
                  <PaginationLink
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    2
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    3
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink
                    aria-label="Next"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    <span aria-hidden={true}>
                        <FontAwesomeIcon icon={faChevronRight}/>
                    </span>
                </PaginationLink>
            </PaginationItem>
        </Pagination>
    </>
  );
}) 

export default CustomPagination;
