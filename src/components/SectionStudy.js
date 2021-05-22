import React from 'react';
import _ from 'lodash';

import {htmlToReact, getPages, Link, withPrefix} from '../utils';

export default class SectionStudy extends React.Component {
    render() {
        let section = _.get(this.props, 'section', null);
        let display_catnotes = _.orderBy(getPages(this.props.pageContext.pages, '/study'), 'frontmatter.date', 'desc');
        let recent_catnotes = display_catnotes.slice(0, _.get(section, 'catnotes_number', null));
        let post_len = _.size(recent_catnotes);
        return (
            <section id={_.get(section, 'section_id', null)} className="block-study block outer">
              <div className="inner">
                {(_.get(section, 'title', null) || _.get(section, 'subtitle', null)) && (
                <div className="block-header inner-sm">
                  {_.get(section, 'title', null) && (
                  <h2 className="block-title line-top">{_.get(section, 'title', null)}</h2>
                  )}
                  {_.get(section, 'subtitle', null) && (
                  <p className="block-subtitle">{htmlToReact(_.get(section, 'subtitle', null))}</p>
                  )}
                </div>
                )}
                <div className="block-content">
                  <div className={'study-feed layout-' + _.get(section, 'layout_style', null)}>
                    {
                    _.map(recent_catnotes, (post, post_idx) => (
                    <article key={post_idx} className="catnote">
                      {(((post_idx === post_len - 1) && _.get(section, 'view_all_label', null)) && _.get(section, 'view_all_url', null)) ? (
                      <Link to={withPrefix(_.get(section, 'view_all_url', null))} className="catnote-link view-all-link">
                        {_.get(post, 'frontmatter.thumb_image', null) && (
                        <div className="catnote-thumbnail">
                          <img src={withPrefix(_.get(post, 'frontmatter.thumb_image', null))} alt={_.get(post, 'frontmatter.thumb_image_alt', null)} />
                        </div>
                        )}
                        <span className="view-all-button">{_.get(section, 'view_all_label', null)}</span>
                      </Link>
                      ) :
                      <Link to={withPrefix(_.get(post, 'url', null))} className="catnote-link">
                        {_.get(post, 'frontmatter.thumb_image', null) && (
                        <div className="catnote-thumbnail">
                          <img src={withPrefix(_.get(post, 'frontmatter.thumb_image', null))} alt={_.get(post, 'frontmatter.thumb_image_alt', null)} />
                        </div>
                        )}
                        <header className="catnote-header">
                          <h3 className="catnote-title">{_.get(post, 'frontmatter.title', null)}</h3>
                        </header>
                      </Link>
                      }
                    </article>
                    ))}
                  </div>
                </div>
              </div>
            </section>
        );
    }
}
